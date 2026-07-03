import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const slug = formData.get('slug');
		const excerpt = formData.get('excerpt');
		const bodyMd = formData.get('bodyMd');
		const status = formData.get('status') === 'published' ? 'published' : 'draft';

		if (
			typeof title !== 'string' ||
			typeof slug !== 'string' ||
			typeof bodyMd !== 'string' ||
			!title ||
			!slug ||
			!bodyMd
		) {
			return fail(400, { error: 'Title, slug, and body are required.' });
		}

		let postId: number;
		try {
			const [post] = await db
				.insert(posts)
				.values({
					title,
					slug,
					bodyMd,
					excerpt: typeof excerpt === 'string' && excerpt ? excerpt : null,
					status,
					publishedAt: status === 'published' ? new Date() : null
				})
				.returning({ id: posts.id });
			postId = post.id;
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		redirect(303, `/admin/posts/${postId}`);
	}
};
