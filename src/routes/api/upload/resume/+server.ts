import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { resumes } from '$lib/server/db/schema';
import { s3, s3PublicUrl } from '$lib/server/s3';
import type { RequestHandler } from './$types';

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const formData = await request.formData();
	const file = formData.get('file');
	const language = formData.get('language');

	if (language !== 'en' && language !== 'ru') {
		error(400, 'language must be "en" or "ru"');
	}

	if (!(file instanceof File)) {
		error(400, 'No file provided');
	}

	if (file.type !== 'application/pdf') {
		error(400, `Unsupported file type: ${file.type}. Only PDF is accepted.`);
	}

	if (file.size > MAX_SIZE_BYTES) {
		error(400, 'File too large (max 10MB)');
	}

	const key = `resume-${language}.pdf`;
	await s3.write(key, await file.arrayBuffer(), { type: file.type });

	const url = s3PublicUrl(key);

	await db
		.insert(resumes)
		.values({ language, url, filename: file.name })
		.onConflictDoUpdate({
			target: resumes.language,
			set: { url, filename: file.name, updatedAt: new Date() }
		});

	return json({ url });
};
