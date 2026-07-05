import { error, json } from '@sveltejs/kit';
import { s3, s3PublicUrl } from '$lib/server/s3';
import type { RequestHandler } from './$types';

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const formData = await request.formData();
	const file = formData.get('file');

	if (!(file instanceof File)) {
		error(400, 'No file provided');
	}

	if (!ALLOWED_TYPES.has(file.type)) {
		error(400, `Unsupported file type: ${file.type}`);
	}

	if (file.size > MAX_SIZE_BYTES) {
		error(400, 'File too large (max 5MB)');
	}

	const ext = file.type.split('/')[1];
	const key = `${crypto.randomUUID()}.${ext}`;

	await s3.write(key, await file.arrayBuffer(), { type: file.type });

	return json({ url: s3PublicUrl(key) });
};
