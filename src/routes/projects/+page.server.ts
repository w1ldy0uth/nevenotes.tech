import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db
		.select({
			slug: projects.slug,
			title: projects.title,
			description: projects.description,
			repoUrl: projects.repoUrl,
			liveUrl: projects.liveUrl
		})
		.from(projects)
		.orderBy(asc(projects.sortOrder));

	return { projects: rows };
};
