import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import { renderMarkdown } from '$lib/server/markdown';
import { getNoteTagNamesAndSlugs } from '$lib/server/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [note] = await db.select().from(notes).where(eq(notes.slug, params.slug));

	if (!note) {
		error(404, 'Note not found');
	}

	const tags = await getNoteTagNamesAndSlugs(note.id);

	return {
		title: note.title,
		createdAt: note.createdAt,
		html: renderMarkdown(note.bodyMd),
		tags
	};
};
