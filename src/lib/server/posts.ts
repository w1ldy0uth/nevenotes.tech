import type { Locale } from '$lib/i18n';
import { pickLocalized, pickLocalizedRequired } from './localized';
import { renderMarkdown } from './markdown';

type LocalizedPost = {
	titleEn: string;
	titleRu: string | null;
	excerptEn: string | null;
	excerptRu: string | null;
};

export function pickPostTitle(post: { titleEn: string; titleRu: string | null }, locale: Locale) {
	return pickLocalizedRequired(post.titleEn, post.titleRu, locale);
}

export function pickPostExcerpt(post: LocalizedPost, locale: Locale) {
	return pickLocalized(post.excerptEn, post.excerptRu, locale);
}

export function renderPostBody(
	post: { bodyMdEn: string; bodyMdRu: string | null },
	locale: Locale
): string {
	const source = locale === 'ru' ? (post.bodyMdRu ?? post.bodyMdEn) : post.bodyMdEn;
	return renderMarkdown(source);
}
