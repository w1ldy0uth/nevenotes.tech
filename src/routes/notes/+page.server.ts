import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import { pickNoteTitle } from '$lib/server/notes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const rows = await db
		.select({
			slug: notes.slug,
			titleEn: notes.titleEn,
			titleRu: notes.titleRu,
			createdAt: notes.createdAt
		})
		.from(notes)
		.orderBy(desc(notes.createdAt));

	return {
		notes: rows.map((note) => ({
			slug: note.slug,
			title: pickNoteTitle(note, locals.locale),
			createdAt: note.createdAt
		}))
	};
};
