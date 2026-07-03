import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db
		.select({ id: notes.id, slug: notes.slug, title: notes.title, updatedAt: notes.updatedAt })
		.from(notes)
		.orderBy(desc(notes.updatedAt));

	return { notes: rows };
};
