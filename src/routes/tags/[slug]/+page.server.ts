import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tags, posts, notes, postTags, noteTags } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [tag] = await db.select().from(tags).where(eq(tags.slug, params.slug));

	if (!tag) {
		error(404, 'Tag not found');
	}

	const taggedPosts = await db
		.select({ slug: posts.slug, title: posts.title, publishedAt: posts.publishedAt })
		.from(postTags)
		.innerJoin(posts, eq(postTags.postId, posts.id))
		.where(and(eq(postTags.tagId, tag.id), eq(posts.status, 'published')));

	const taggedNotes = await db
		.select({ slug: notes.slug, title: notes.title, createdAt: notes.createdAt })
		.from(noteTags)
		.innerJoin(notes, eq(noteTags.noteId, notes.id))
		.where(eq(noteTags.tagId, tag.id));

	return { tag, posts: taggedPosts, notes: taggedNotes };
};
