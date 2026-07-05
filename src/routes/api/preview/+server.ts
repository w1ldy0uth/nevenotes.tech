import { error, json } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/server/markdown';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const { markdown } = await request.json();

	if (typeof markdown !== 'string') {
		error(400, 'markdown must be a string');
	}

	return json({ html: renderMarkdown(markdown) });
};
