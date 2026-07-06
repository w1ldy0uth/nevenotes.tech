import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { getPostTagNames, setPostTags } from '$lib/server/tags';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		error(404, 'Post not found');
	}

	const [post] = await db.select().from(posts).where(eq(posts.id, id));

	if (!post) {
		error(404, 'Post not found');
	}

	const tagNames = await getPostTagNames(id);

	return { post: { ...post, tags: tagNames.join(', ') } };
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const id = Number(params.id);
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

		const [existing] = await db
			.select({ status: posts.status, publishedAt: posts.publishedAt })
			.from(posts)
			.where(eq(posts.id, id));

		if (!existing) {
			error(404, 'Post not found');
		}

		const publishedAt =
			status === 'published' ? (existing.publishedAt ?? new Date()) : existing.publishedAt;

		try {
			await db
				.update(posts)
				.set({
					titleEn,
					titleRu: typeof titleRu === 'string' && titleRu ? titleRu : null,
					slug,
					bodyMdEn,
					bodyMdRu: typeof bodyMdRu === 'string' && bodyMdRu ? bodyMdRu : null,
					excerptEn: typeof excerptEn === 'string' && excerptEn ? excerptEn : null,
					excerptRu: typeof excerptRu === 'string' && excerptRu ? excerptRu : null,
					status,
					publishedAt,
					updatedAt: new Date()
				})
				.where(eq(posts.id, id));
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		await setPostTags(id, typeof tagsInput === 'string' ? tagsInput : '');

		return { success: true };
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		await db.delete(posts).where(eq(posts.id, id));
		redirect(303, '/admin/posts');
	}
};
