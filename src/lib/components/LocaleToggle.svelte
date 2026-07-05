<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();

	async function select(next: Locale) {
		if (next === locale) return;
		document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
		await invalidateAll();
	}
</script>

<div class="flex items-center gap-1 text-sm font-medium">
	<button
		type="button"
		onclick={() => select('en')}
		class="rounded-full px-2 py-0.5 transition {locale === 'en'
			? 'bg-coral text-white'
			: 'text-ink-soft hover:text-ink'}"
	>
		EN
	</button>
	<button
		type="button"
		onclick={() => select('ru')}
		class="rounded-full px-2 py-0.5 transition {locale === 'ru'
			? 'bg-coral text-white'
			: 'text-ink-soft hover:text-ink'}"
	>
		RU
	</button>
</div>
