import type { Locale } from '$lib/i18n';
import { pickLocalized } from './localized';
import { renderMarkdown } from './markdown';

type LocalizedDescription = {
	descriptionEn: string | null;
	descriptionRu: string | null;
};

export function renderProjectDescription(
	project: LocalizedDescription,
	locale: Locale
): string | null {
	const source = pickLocalized(project.descriptionEn, project.descriptionRu, locale);
	return source ? renderMarkdown(source) : null;
}

type LocalizedShortDescription = {
	shortDescriptionEn: string | null;
	shortDescriptionRu: string | null;
};

export function pickProjectShortDescription(
	project: LocalizedShortDescription,
	locale: Locale
): string | null {
	return pickLocalized(project.shortDescriptionEn, project.shortDescriptionRu, locale);
}
