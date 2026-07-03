import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
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

		let projectId: number;
		try {
			const [project] = await db
				.insert(projects)
				.values({
					title,
					slug,
					description: typeof description === 'string' && description ? description : null,
					repoUrl: typeof repoUrl === 'string' && repoUrl ? repoUrl : null,
					liveUrl: typeof liveUrl === 'string' && liveUrl ? liveUrl : null,
					sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0
				})
				.returning({ id: projects.id });
			projectId = project.id;
		} catch {
			return fail(400, { error: `Slug "${slug}" is already in use.` });
		}

		redirect(303, `/admin/projects/${projectId}`);
	}
};
