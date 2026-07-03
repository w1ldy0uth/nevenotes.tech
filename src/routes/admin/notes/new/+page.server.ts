import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const slug = formData.get('slug');
		const bodyMd = formData.get('bodyMd');

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

		let noteId: number;
		try {
			const [note] = await db
				.insert(notes)
				.values({ title, slug, bodyMd })
				.returning({ id: notes.id });
			noteId = note.id;
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		redirect(303, `/admin/notes/${noteId}`);
	}
};
