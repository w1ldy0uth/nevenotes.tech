import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { pickPostTitle, renderPostBody } from '$lib/server/posts';
import { getPostTagNamesAndSlugs } from '$lib/server/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [post] = await db.select().from(posts).where(eq(posts.slug, params.slug));

	if (!post || post.status !== 'published') {
		error(404, 'Post not found');
	}

	const tags = await getPostTagNamesAndSlugs(post.id);

	return {
		title: pickPostTitle(post, locals.locale),
		publishedAt: post.publishedAt,
		html: renderPostBody(post, locals.locale),
		tags
	};
};
