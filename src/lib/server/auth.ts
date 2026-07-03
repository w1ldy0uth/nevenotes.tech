import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';

const SESSION_COOKIE_NAME = 'session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const SESSION_RENEWAL_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // renew when < 15 days left

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return Buffer.from(bytes).toString('hex');
}

async function hashToken(token: string): Promise<string> {
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
	return Buffer.from(hash).toString('hex');
}

export async function hashPassword(password: string): Promise<string> {
	return Bun.password.hash(password, { algorithm: 'argon2id' });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return Bun.password.verify(password, hash);
}

export async function createSession(token: string, userId: number) {
	const sessionId = await hashToken(token);
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

	await db.insert(sessions).values({ id: sessionId, userId, expiresAt });

	return { id: sessionId, userId, expiresAt };
}

export async function validateSessionToken(token: string) {
	const sessionId = await hashToken(token);

	const [row] = await db
		.select({ session: sessions, user: { id: users.id, email: users.email } })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId));

	if (!row) return { session: null, user: null };

	if (Date.now() >= row.session.expiresAt.getTime()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return { session: null, user: null };
	}

	if (row.session.expiresAt.getTime() - Date.now() < SESSION_RENEWAL_THRESHOLD_MS) {
		const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
		await db.update(sessions).set({ expiresAt }).where(eq(sessions.id, sessionId));
		row.session.expiresAt = expiresAt;
	}

	return { session: row.session, user: row.user };
}

export async function invalidateSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(SESSION_COOKIE_NAME, token, {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		secure: !import.meta.env.DEV,
		sameSite: 'lax'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}

export function getSessionToken(event: RequestEvent): string | undefined {
	return event.cookies.get(SESSION_COOKIE_NAME);
}
