import type { Locale } from '$lib/i18n';
import { pickLocalizedRequired } from './localized';
import { renderMarkdown } from './markdown';

export function pickNoteTitle(note: { titleEn: string; titleRu: string | null }, locale: Locale) {
	return pickLocalizedRequired(note.titleEn, note.titleRu, locale);
}

export function renderNoteBody(
	note: { bodyMdEn: string; bodyMdRu: string | null },
	locale: Locale
): string {
	const source = locale === 'ru' ? (note.bodyMdRu ?? note.bodyMdEn) : note.bodyMdEn;
	return renderMarkdown(source);
}
