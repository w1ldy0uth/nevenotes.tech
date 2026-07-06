import { sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { Locale } from '$lib/i18n';
import type { RequestHandler } from './$types';

type SearchRow = {
	type: 'post' | 'note';
	slug: string;
	title: string;
	snippet: string;
	rank: number;
};

function tsConfig(locale: Locale) {
	return locale === 'ru' ? sql.raw(`'russian'`) : sql.raw(`'english'`);
}

function localizedTitle(locale: Locale) {
	return locale === 'ru' ? sql`coalesce(title_ru, title_en)` : sql`coalesce(title_en, title_ru)`;
}

function localizedBody(locale: Locale) {
	return locale === 'ru'
		? sql`coalesce(body_md_ru, body_md_en)`
		: sql`coalesce(body_md_en, body_md_ru)`;
}

function localizedExcerpt(locale: Locale) {
	return locale === 'ru'
		? sql`coalesce(excerpt_ru, excerpt_en, body_md_ru, body_md_en)`
		: sql`coalesce(excerpt_en, excerpt_ru, body_md_en, body_md_ru)`;
}

const postsQuery = (q: string, locale: Locale) => {
	const config = tsConfig(locale);
	const title = localizedTitle(locale);
	const body = localizedBody(locale);
	const excerpt = localizedExcerpt(locale);

	return sql`
		select
			'post' as type,
			slug,
			${title} as title,
			ts_headline(${config}, ${excerpt}, plainto_tsquery(${config}, ${q})) as snippet,
			ts_rank(to_tsvector(${config}, ${title} || ' ' || ${body}), plainto_tsquery(${config}, ${q})) as rank
		from posts
		where status = 'published'
			and to_tsvector(${config}, ${title} || ' ' || ${body}) @@ plainto_tsquery(${config}, ${q})
	`;
};

const notesQuery = (q: string, locale: Locale) => {
	const config = tsConfig(locale);
	const title = localizedTitle(locale);
	const body = localizedBody(locale);

	return sql`
		select
			'note' as type,
			slug,
			${title} as title,
			ts_headline(${config}, ${body}, plainto_tsquery(${config}, ${q})) as snippet,
			ts_rank(to_tsvector(${config}, ${title} || ' ' || ${body}), plainto_tsquery(${config}, ${q})) as rank
		from notes
		where to_tsvector(${config}, ${title} || ' ' || ${body}) @@ plainto_tsquery(${config}, ${q})
	`;
};

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.trim();
	const type = url.searchParams.get('type');
	const locale: Locale = url.searchParams.get('locale') === 'ru' ? 'ru' : 'en';

	if (!q) {
		return json({ results: [] });
	}

	const union =
		type === 'post'
			? postsQuery(q, locale)
			: type === 'note'
				? notesQuery(q, locale)
				: sql`${postsQuery(q, locale)} union all ${notesQuery(q, locale)}`;

	const rows = await db.execute(sql`
		select * from (${union}) results
		order by rank desc
		limit 20
	`);

	return json({ results: rows as unknown as SearchRow[] });
};
