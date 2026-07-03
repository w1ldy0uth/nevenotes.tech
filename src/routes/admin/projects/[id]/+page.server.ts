import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		error(404, 'Project not found');
	}

	const [project] = await db.select().from(projects).where(eq(projects.id, id));

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const id = Number(params.id);
		const formData = await request.formData();
		const title = formData.get('title');
		const slug = formData.get('slug');
		const description = formData.get('description');
		const repoUrl = formData.get('repoUrl');
		const liveUrl = formData.get('liveUrl');
		const sortOrder = Number(formData.get('sortOrder') ?? 0);

		if (typeof title !== 'string' || typeof slug !== 'string' || !title || !slug) {
			return fail(400, { error: 'Title and slug are required.' });
		}

		try {
			await db
				.update(projects)
				.set({
					title,
					slug,
					description: typeof description === 'string' && description ? description : null,
					repoUrl: typeof repoUrl === 'string' && repoUrl ? repoUrl : null,
					liveUrl: typeof liveUrl === 'string' && liveUrl ? liveUrl : null,
					sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0
				})
				.where(eq(projects.id, id));
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		return { success: true };
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		await db.delete(projects).where(eq(projects.id, id));
		redirect(303, '/admin/projects');
	}
};
