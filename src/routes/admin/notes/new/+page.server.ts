import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import { setNoteTags } from '$lib/server/tags';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
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

		let noteId: number;
		try {
			const [note] = await db
				.insert(notes)
				.values({
					titleEn,
					titleRu: typeof titleRu === 'string' && titleRu ? titleRu : null,
					slug,
					bodyMdEn,
					bodyMdRu: typeof bodyMdRu === 'string' && bodyMdRu ? bodyMdRu : null
				})
				.returning({ id: notes.id });
			noteId = note.id;
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		await setNoteTags(noteId, typeof tagsInput === 'string' ? tagsInput : '');

		redirect(303, `/admin/notes/${noteId}`);
	}
};
