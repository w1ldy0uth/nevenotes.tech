import { asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { notes, posts, projects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

const PREVIEW_LIMIT = 3;

export const load: PageServerLoad = async () => {
	const [recentPosts, recentNotes, featuredProjects] = await Promise.all([
		db
			.select({ slug: posts.slug, title: posts.title, excerpt: posts.excerpt, publishedAt: posts.publishedAt })
			.from(posts)
			.where(eq(posts.status, 'published'))
			.orderBy(desc(posts.publishedAt))
			.limit(PREVIEW_LIMIT),
		db
			.select({ slug: notes.slug, title: notes.title, createdAt: notes.createdAt })
			.from(notes)
			.orderBy(desc(notes.createdAt))
			.limit(PREVIEW_LIMIT),
		db
			.select({ slug: projects.slug, title: projects.title, description: projects.description })
			.from(projects)
			.orderBy(asc(projects.sortOrder))
			.limit(PREVIEW_LIMIT)
	]);

	return { recentPosts, recentNotes, featuredProjects };
};
