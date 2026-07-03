import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { notes } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db
		.select({ slug: notes.slug, title: notes.title, createdAt: notes.createdAt })
		.from(notes)
		.orderBy(desc(notes.createdAt));

	return { notes: rows };
};
