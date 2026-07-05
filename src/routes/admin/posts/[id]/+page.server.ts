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
		const title = formData.get('title');
		const slug = formData.get('slug');
		const excerpt = formData.get('excerpt');
		const bodyMd = formData.get('bodyMd');
		const tagsInput = formData.get('tags');
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
					title,
					slug,
					bodyMd,
					excerpt: typeof excerpt === 'string' && excerpt ? excerpt : null,
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
