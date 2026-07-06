import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { pickPostExcerpt, pickPostTitle } from '$lib/server/posts';
import type { RequestHandler } from './$types';

function escapeXml(input: string): string {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ url }) => {
	const siteUrl = url.origin;
	const locale = url.searchParams.get('locale') === 'ru' ? 'ru' : 'en';

	const rows = await db
		.select({
			slug: posts.slug,
			titleEn: posts.titleEn,
			titleRu: posts.titleRu,
			excerptEn: posts.excerptEn,
			excerptRu: posts.excerptRu,
			publishedAt: posts.publishedAt
		})
		.from(posts)
		.where(eq(posts.status, 'published'))
		.orderBy(desc(posts.publishedAt));

	const items = rows
		.map((post) => {
			const title = pickPostTitle(post, locale);
			const excerpt = pickPostExcerpt(post, locale);
			return `
		<item>
			<title>${escapeXml(title)}</title>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid>${siteUrl}/blog/${post.slug}</guid>
			${excerpt ? `<description>${escapeXml(excerpt)}</description>` : ''}
			${post.publishedAt ? `<pubDate>${post.publishedAt.toUTCString()}</pubDate>` : ''}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>nevenotes.tech — Blog</title>
		<link>${siteUrl}/blog</link>
		<description>Blog posts from nevenotes.tech</description>${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { 'content-type': 'application/rss+xml; charset=utf-8' }
	});
};
