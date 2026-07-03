import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie,
	verifyPassword
} from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/admin');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
			return fail(400, { error: 'Email and password are required.' });
		}

		const [user] = await db.select().from(users).where(eq(users.email, email));

		if (!user || !(await verifyPassword(user.passwordHash, password))) {
			return fail(400, { error: 'Invalid email or password.' });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(event, token, session.expiresAt);

		redirect(303, '/admin');
	}
};
