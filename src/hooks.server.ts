import type { Handle } from '@sveltejs/kit';
import {
	deleteSessionTokenCookie,
	getSessionToken,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const token = getSessionToken(event);

	if (!token) {
		event.locals.user = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);

	if (session) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.user = user;

	return resolve(event);
};
