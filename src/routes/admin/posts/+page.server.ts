import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db
		.select({
			id: posts.id,
			slug: posts.slug,
			title: posts.titleEn,
			status: posts.status,
			updatedAt: posts.updatedAt
		})
		.from(posts)
		.orderBy(desc(posts.updatedAt));

	return { posts: rows };
};
