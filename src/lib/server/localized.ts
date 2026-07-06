import type { Locale } from '$lib/i18n';

/** Picks the field matching `locale`, falling back to the other language if empty. */
export function pickLocalized(en: string | null, ru: string | null, locale: Locale): string | null {
	return locale === 'ru' ? (ru ?? en) : (en ?? ru);
}

/** Same as {@link pickLocalized}, but for fields that are always populated (e.g. required titles). */
export function pickLocalizedRequired(en: string, ru: string | null, locale: Locale): string {
	return locale === 'ru' ? (ru ?? en) : en;
}
