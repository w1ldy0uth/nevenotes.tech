import { eq, inArray } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { tags, postTags, noteTags } from '$lib/server/db/schema';
import { slugify } from '$lib/slug';

export function parseTagNames(input: string): string[] {
	const seen = new Set<string>();
	for (const raw of input.split(',')) {
		const name = raw.trim();
		if (name) seen.add(name);
	}
	return [...seen];
}

async function upsertTags(names: string[]): Promise<number[]> {
	if (names.length === 0) return [];

	const ids: number[] = [];

	for (const name of names) {
		const slug = slugify(name);

		const [existing] = await db.select().from(tags).where(eq(tags.slug, slug));
		if (existing) {
			ids.push(existing.id);
			continue;
		}

		const [created] = await db.insert(tags).values({ name, slug }).returning({ id: tags.id });
		ids.push(created.id);
	}

	return ids;
}

export async function setPostTags(postId: number, tagNamesInput: string) {
	const tagIds = await upsertTags(parseTagNames(tagNamesInput));

	await db.delete(postTags).where(eq(postTags.postId, postId));
	if (tagIds.length > 0) {
		await db.insert(postTags).values(tagIds.map((tagId) => ({ postId, tagId })));
	}
}

export async function setNoteTags(noteId: number, tagNamesInput: string) {
	const tagIds = await upsertTags(parseTagNames(tagNamesInput));

	await db.delete(noteTags).where(eq(noteTags.noteId, noteId));
	if (tagIds.length > 0) {
		await db.insert(noteTags).values(tagIds.map((tagId) => ({ noteId, tagId })));
	}
}

export async function getPostTagNames(postId: number): Promise<string[]> {
	const rows = await db
		.select({ name: tags.name })
		.from(postTags)
		.innerJoin(tags, eq(postTags.tagId, tags.id))
		.where(eq(postTags.postId, postId));
	return rows.map((r) => r.name);
}

export async function getNoteTagNames(noteId: number): Promise<string[]> {
	const rows = await db
		.select({ name: tags.name })
		.from(noteTags)
		.innerJoin(tags, eq(noteTags.tagId, tags.id))
		.where(eq(noteTags.noteId, noteId));
	return rows.map((r) => r.name);
}

export async function getPostTagNamesAndSlugs(postId: number): Promise<{ name: string; slug: string }[]> {
	return (await getTagsForPosts([postId])).get(postId) ?? [];
}

export async function getNoteTagNamesAndSlugs(noteId: number): Promise<{ name: string; slug: string }[]> {
	return (await getTagsForNotes([noteId])).get(noteId) ?? [];
}

export async function getTagsForPosts(postIds: number[]) {
	if (postIds.length === 0) return new Map<number, { name: string; slug: string }[]>();

	const rows = await db
		.select({ postId: postTags.postId, name: tags.name, slug: tags.slug })
		.from(postTags)
		.innerJoin(tags, eq(postTags.tagId, tags.id))
		.where(inArray(postTags.postId, postIds));

	const map = new Map<number, { name: string; slug: string }[]>();
	for (const row of rows) {
		const list = map.get(row.postId) ?? [];
		list.push({ name: row.name, slug: row.slug });
		map.set(row.postId, list);
	}
	return map;
}

export async function getTagsForNotes(noteIds: number[]) {
	if (noteIds.length === 0) return new Map<number, { name: string; slug: string }[]>();

	const rows = await db
		.select({ noteId: noteTags.noteId, name: tags.name, slug: tags.slug })
		.from(noteTags)
		.innerJoin(tags, eq(noteTags.tagId, tags.id))
		.where(inArray(noteTags.noteId, noteIds));

	const map = new Map<number, { name: string; slug: string }[]>();
	for (const row of rows) {
		const list = map.get(row.noteId) ?? [];
		list.push({ name: row.name, slug: row.slug });
		map.set(row.noteId, list);
	}
	return map;
}
