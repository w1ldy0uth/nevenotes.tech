import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import { pickNoteTitle, renderNoteBody } from '$lib/server/notes';
import { getNoteTagNamesAndSlugs } from '$lib/server/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [note] = await db.select().from(notes).where(eq(notes.slug, params.slug));

	if (!note) {
		error(404, 'Note not found');
	}

	const tags = await getNoteTagNamesAndSlugs(note.id);

	return {
		title: pickNoteTitle(note, locals.locale),
		createdAt: note.createdAt,
		html: renderNoteBody(note, locals.locale),
		tags
	};
};
