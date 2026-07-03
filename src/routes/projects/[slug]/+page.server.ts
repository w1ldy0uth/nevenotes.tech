import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [project] = await db.select().from(projects).where(eq(projects.slug, params.slug));

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};
