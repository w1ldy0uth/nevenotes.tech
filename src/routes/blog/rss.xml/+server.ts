import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
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

	const rows = await db
		.select({
			slug: posts.slug,
			title: posts.title,
			excerpt: posts.excerpt,
			publishedAt: posts.publishedAt
		})
		.from(posts)
		.where(eq(posts.status, 'published'))
		.orderBy(desc(posts.publishedAt));

	const items = rows
		.map(
			(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid>${siteUrl}/blog/${post.slug}</guid>
			${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
			${post.publishedAt ? `<pubDate>${post.publishedAt.toUTCString()}</pubDate>` : ''}
		</item>`
		)
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
