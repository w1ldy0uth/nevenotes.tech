import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { pickProjectShortDescription } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const rows = await db
		.select({
			slug: projects.slug,
			title: projects.title,
			shortDescriptionEn: projects.shortDescriptionEn,
			shortDescriptionRu: projects.shortDescriptionRu,
			repoUrl: projects.repoUrl,
			liveUrl: projects.liveUrl
		})
		.from(projects)
		.orderBy(asc(projects.sortOrder));

	return {
		projects: rows.map((project) => ({
			slug: project.slug,
			title: project.title,
			repoUrl: project.repoUrl,
			liveUrl: project.liveUrl,
			shortDescription: pickProjectShortDescription(project, locals.locale)
		}))
	};
};
