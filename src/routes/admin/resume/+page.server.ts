import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { resumes } from '$lib/server/db/schema';
import { s3 } from '$lib/server/s3';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db.select().from(resumes);

	return {
		en: rows.find((r) => r.language === 'en') ?? null,
		ru: rows.find((r) => r.language === 'ru') ?? null
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const language = formData.get('language');

		if (language !== 'en' && language !== 'ru') {
			return fail(400, { error: 'Invalid language.' });
		}

		await s3.delete(`resume-${language}.pdf`);
		await db.delete(resumes).where(eq(resumes.language, language));

		return { success: true };
	}
};
