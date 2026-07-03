import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { renderMarkdown } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [post] = await db.select().from(posts).where(eq(posts.slug, params.slug));

	if (!post || post.status !== 'published') {
		error(404, 'Post not found');
	}

	return {
		title: post.title,
		publishedAt: post.publishedAt,
		html: renderMarkdown(post.bodyMd)
	};
};
