import { db } from '$lib/server/db';
import { resumes } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db.select().from(resumes);

	return {
		resumeEn: rows.find((r) => r.language === 'en')?.url ?? null,
		resumeRu: rows.find((r) => r.language === 'ru')?.url ?? null
	};
};
