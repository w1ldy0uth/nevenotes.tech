import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db
		.select({
			id: projects.id,
			slug: projects.slug,
			title: projects.title,
			sortOrder: projects.sortOrder
		})
		.from(projects)
		.orderBy(asc(projects.sortOrder));

	return { projects: rows };
};
