import type { Locale } from '$lib/i18n';
import { renderMarkdown } from './markdown';

function pickLocalized(en: string | null, ru: string | null, locale: Locale): string | null {
	return locale === 'ru' ? (ru ?? en) : (en ?? ru);
}

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
