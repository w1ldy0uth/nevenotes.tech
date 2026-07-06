import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { setPostTags } from '$lib/server/tags';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const titleEn = formData.get('titleEn');
		const titleRu = formData.get('titleRu');
		const slug = formData.get('slug');
		const excerptEn = formData.get('excerptEn');
		const excerptRu = formData.get('excerptRu');
		const bodyMdEn = formData.get('bodyMdEn');
		const bodyMdRu = formData.get('bodyMdRu');
		const tagsInput = formData.get('tags');
		const status = formData.get('status') === 'published' ? 'published' : 'draft';

		if (
			typeof titleEn !== 'string' ||
			typeof slug !== 'string' ||
			typeof bodyMdEn !== 'string' ||
			!titleEn ||
			!slug ||
			!bodyMdEn
		) {
			return fail(400, { error: 'Title (EN), slug, and body (EN) are required.' });
		}

		let postId: number;
		try {
			const [post] = await db
				.insert(posts)
				.values({
					titleEn,
					titleRu: typeof titleRu === 'string' && titleRu ? titleRu : null,
					slug,
					bodyMdEn,
					bodyMdRu: typeof bodyMdRu === 'string' && bodyMdRu ? bodyMdRu : null,
					excerptEn: typeof excerptEn === 'string' && excerptEn ? excerptEn : null,
					excerptRu: typeof excerptRu === 'string' && excerptRu ? excerptRu : null,
					status,
					publishedAt: status === 'published' ? new Date() : null
				})
				.returning({ id: posts.id });
			postId = post.id;
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		await setPostTags(postId, typeof tagsInput === 'string' ? tagsInput : '');

		redirect(303, `/admin/posts/${postId}`);
	}
};
