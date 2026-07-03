import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
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

	return { note };
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const id = Number(params.id);
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

		try {
			await db
				.update(notes)
				.set({ title, slug, bodyMd, updatedAt: new Date() })
				.where(eq(notes.id, id));
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		return { success: true };
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		await db.delete(notes).where(eq(notes.id, id));
		redirect(303, '/admin/notes');
	}
};
