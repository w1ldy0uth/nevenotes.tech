<script lang="ts">
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();

	let tr = $derived(t(locale));
</script>

<footer class="mx-auto max-w-2xl px-4 py-10 text-sm text-ink-soft">
	<p>
		<a
			href="https://github.com/w1ldy0uth/nevenotes.tech"
			class="font-medium text-coral-dark hover:underline"
			target="_blank"
			rel="noreferrer noopener">{tr.footer.madeBy}</a
		>
		{tr.footer.authorName}. {tr.footer.poweredBy}
		<a
			href="https://svelte.dev"
			class="font-medium text-coral-dark hover:underline"
			target="_blank"
			rel="noreferrer noopener">SvelteKit</a
		>
		{tr.footer.and}
		<a
			href="https://bun.sh"
			class="font-medium text-coral-dark hover:underline"
			target="_blank"
			rel="noreferrer noopener">Bun</a
		>.
	</p>
</footer>
