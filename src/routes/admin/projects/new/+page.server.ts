import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const slug = formData.get('slug');
		const shortDescriptionEn = formData.get('shortDescriptionEn');
		const shortDescriptionRu = formData.get('shortDescriptionRu');
		const descriptionEn = formData.get('descriptionEn');
		const descriptionRu = formData.get('descriptionRu');
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
					shortDescriptionEn:
						typeof shortDescriptionEn === 'string' && shortDescriptionEn
							? shortDescriptionEn
							: null,
					shortDescriptionRu:
						typeof shortDescriptionRu === 'string' && shortDescriptionRu
							? shortDescriptionRu
							: null,
					descriptionEn: typeof descriptionEn === 'string' && descriptionEn ? descriptionEn : null,
					descriptionRu: typeof descriptionRu === 'string' && descriptionRu ? descriptionRu : null,
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
