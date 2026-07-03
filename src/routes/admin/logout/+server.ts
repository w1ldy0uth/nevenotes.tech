import { redirect } from '@sveltejs/kit';
import {
	deleteSessionTokenCookie,
	getSessionToken,
	invalidateSession,
	validateSessionToken
} from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const token = getSessionToken(event);

	if (token) {
		const { session } = await validateSessionToken(token);
		if (session) {
			await invalidateSession(session.id);
		}
	}

	deleteSessionTokenCookie(event);
	redirect(303, '/admin/login');
};
