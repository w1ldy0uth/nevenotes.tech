import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { renderProjectDescription } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [project] = await db.select().from(projects).where(eq(projects.slug, params.slug));

	if (!project) {
		error(404, 'Project not found');
	}

	return {
		project: {
			slug: project.slug,
			title: project.title,
			repoUrl: project.repoUrl,
			liveUrl: project.liveUrl,
			descriptionHtml: renderProjectDescription(project, locals.locale)
		}
	};
};
