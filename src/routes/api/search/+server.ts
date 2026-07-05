import { sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

type SearchRow = {
	type: 'post' | 'note';
	slug: string;
	title: string;
	snippet: string;
	rank: number;
};

const postsQuery = (q: string) => sql`
	select
		'post' as type,
		slug,
		title,
		ts_headline('english', coalesce(excerpt, body_md), plainto_tsquery('english', ${q})) as snippet,
		ts_rank(to_tsvector('english', title || ' ' || body_md), plainto_tsquery('english', ${q})) as rank
	from posts
	where status = 'published'
		and to_tsvector('english', title || ' ' || body_md) @@ plainto_tsquery('english', ${q})
`;

const notesQuery = (q: string) => sql`
	select
		'note' as type,
		slug,
		title,
		ts_headline('english', body_md, plainto_tsquery('english', ${q})) as snippet,
		ts_rank(to_tsvector('english', title || ' ' || body_md), plainto_tsquery('english', ${q})) as rank
	from notes
	where to_tsvector('english', title || ' ' || body_md) @@ plainto_tsquery('english', ${q})
`;

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.trim();
	const type = url.searchParams.get('type');

	if (!q) {
		return json({ results: [] });
	}

	const union =
		type === 'post'
			? postsQuery(q)
			: type === 'note'
				? notesQuery(q)
				: sql`${postsQuery(q)} union all ${notesQuery(q)}`;

	const rows = await db.execute(sql`
		select * from (${union}) results
		order by rank desc
		limit 20
	`);

	return json({ results: rows as unknown as SearchRow[] });
};
