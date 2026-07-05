import type { Handle } from '@sveltejs/kit';
import {
	deleteSessionTokenCookie,
	getSessionToken,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const localeCookie = event.cookies.get('locale');
	event.locals.locale = localeCookie === 'ru' ? 'ru' : 'en';

	const token = getSessionToken(event);

	if (!token) {
		event.locals.user = null;
	} else {
		const { session, user } = await validateSessionToken(token);

		if (session) {
			setSessionTokenCookie(event, token, session.expiresAt);
		} else {
			deleteSessionTokenCookie(event);
		}

		event.locals.user = user;
	}

	const response = await resolve(event);

	if (response.headers.get('content-type')?.includes('text/html')) {
		response.headers.set('cache-control', 'no-store');
	}

	return response;
};
