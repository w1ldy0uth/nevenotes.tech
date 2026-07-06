import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import { getNoteTagNames, setNoteTags } from '$lib/server/tags';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		error(404, 'Note not found');
	}

	const [note] = await db.select().from(notes).where(eq(notes.id, id));

	if (!note) {
		error(404, 'Note not found');
	}

	const tagNames = await getNoteTagNames(id);

	return { note: { ...note, tags: tagNames.join(', ') } };
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const id = Number(params.id);
		const formData = await request.formData();
		const titleEn = formData.get('titleEn');
		const titleRu = formData.get('titleRu');
		const slug = formData.get('slug');
		const bodyMdEn = formData.get('bodyMdEn');
		const bodyMdRu = formData.get('bodyMdRu');
		const tagsInput = formData.get('tags');

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

		try {
			await db
				.update(notes)
				.set({
					titleEn,
					titleRu: typeof titleRu === 'string' && titleRu ? titleRu : null,
					slug,
					bodyMdEn,
					bodyMdRu: typeof bodyMdRu === 'string' && bodyMdRu ? bodyMdRu : null,
					updatedAt: new Date()
				})
				.where(eq(notes.id, id));
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		await setNoteTags(id, typeof tagsInput === 'string' ? tagsInput : '');

		return { success: true };
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		await db.delete(notes).where(eq(notes.id, id));
		redirect(303, '/admin/notes');
	}
};
