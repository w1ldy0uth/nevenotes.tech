import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tags, posts, notes, postTags, noteTags } from '$lib/server/db/schema';
import { pickNoteTitle } from '$lib/server/notes';
import { pickPostTitle } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [tag] = await db.select().from(tags).where(eq(tags.slug, params.slug));

	if (!tag) {
		error(404, 'Tag not found');
	}

	const taggedPosts = await db
		.select({
			slug: posts.slug,
			titleEn: posts.titleEn,
			titleRu: posts.titleRu,
			publishedAt: posts.publishedAt
		})
		.from(postTags)
		.innerJoin(posts, eq(postTags.postId, posts.id))
		.where(and(eq(postTags.tagId, tag.id), eq(posts.status, 'published')));

	const taggedNotes = await db
		.select({
			slug: notes.slug,
			titleEn: notes.titleEn,
			titleRu: notes.titleRu,
			createdAt: notes.createdAt
		})
		.from(noteTags)
		.innerJoin(notes, eq(noteTags.noteId, notes.id))
		.where(eq(noteTags.tagId, tag.id));

	return {
		tag,
		posts: taggedPosts.map((post) => ({
			slug: post.slug,
			title: pickPostTitle(post, locals.locale),
			publishedAt: post.publishedAt
		})),
		notes: taggedNotes.map((note) => ({
			slug: note.slug,
			title: pickNoteTitle(note, locals.locale),
			createdAt: note.createdAt
		}))
	};
};
