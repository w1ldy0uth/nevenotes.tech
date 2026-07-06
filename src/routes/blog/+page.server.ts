import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { pickPostExcerpt, pickPostTitle } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
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

	return {
		posts: rows.map((post) => ({
			slug: post.slug,
			title: pickPostTitle(post, locals.locale),
			excerpt: pickPostExcerpt(post, locals.locale),
			publishedAt: post.publishedAt
		}))
	};
};
