import { asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { notes, posts, projects } from '$lib/server/db/schema';
import { pickNoteTitle } from '$lib/server/notes';
import { pickPostExcerpt, pickPostTitle } from '$lib/server/posts';
import { pickProjectShortDescription } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

const PREVIEW_LIMIT = 3;

export const load: PageServerLoad = async ({ locals }) => {
	const [recentPosts, recentNotes, featuredProjects] = await Promise.all([
		db
			.select({
				slug: posts.slug,
				titleEn: posts.titleEn,
				titleRu: posts.titleRu,
				excerptEn: posts.excerptEn,
				excerptRu: posts.excerptRu,
				publishedAt: posts.publishedAt
			})
			.from(posts)
			.where(eq(posts.status, 'published'))
			.orderBy(desc(posts.publishedAt))
			.limit(PREVIEW_LIMIT),
		db
			.select({
				slug: notes.slug,
				titleEn: notes.titleEn,
				titleRu: notes.titleRu,
				createdAt: notes.createdAt
			})
			.from(notes)
			.orderBy(desc(notes.createdAt))
			.limit(PREVIEW_LIMIT),
		db
			.select({
				slug: projects.slug,
				title: projects.title,
				shortDescriptionEn: projects.shortDescriptionEn,
				shortDescriptionRu: projects.shortDescriptionRu
			})
			.from(projects)
			.orderBy(asc(projects.sortOrder))
			.limit(PREVIEW_LIMIT)
	]);

	return {
		recentPosts: recentPosts.map((post) => ({
			slug: post.slug,
			title: pickPostTitle(post, locals.locale),
			excerpt: pickPostExcerpt(post, locals.locale),
			publishedAt: post.publishedAt
		})),
		recentNotes: recentNotes.map((note) => ({
			slug: note.slug,
			title: pickNoteTitle(note, locals.locale),
			createdAt: note.createdAt
		})),
		featuredProjects: featuredProjects.map((project) => ({
			slug: project.slug,
			title: project.title,
			shortDescription: pickProjectShortDescription(project, locals.locale)
		}))
	};
};
