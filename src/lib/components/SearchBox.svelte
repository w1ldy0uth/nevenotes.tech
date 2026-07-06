<script lang="ts">
	import { t, type Locale } from '$lib/i18n';

	type Result = { slug: string; title: string; snippet: string };

	let { type, basePath, locale }: { type: 'post' | 'note'; basePath: string; locale: Locale } =
		$props();

	let tr = $derived(t(locale));

	let query = $state('');
	let results = $state<Result[]>([]);
	let loading = $state(false);
	let debounceHandle: ReturnType<typeof setTimeout>;

	function onInput() {
		clearTimeout(debounceHandle);

		if (!query.trim()) {
			results = [];
			loading = false;
			return;
		}

		loading = true;
		debounceHandle = setTimeout(async () => {
			const res = await fetch(
				`/api/search?q=${encodeURIComponent(query)}&type=${type}&locale=${locale}`
			);
			const data = await res.json();
			results = data.results;
			loading = false;
		}, 250);
	}
</script>

<div class="mb-6">
	<input
		type="search"
		bind:value={query}
		oninput={onInput}
		placeholder={tr.search.placeholder}
		class="w-full rounded-full bg-surface px-4 py-2 shadow-warm-sm outline-none focus:ring-2 focus:ring-coral"
	/>

	{#if query.trim()}
		<ul class="mt-3 flex flex-col gap-3">
			{#if loading}
				<li class="text-sm text-ink-soft">{tr.search.searching}</li>
			{:else if results.length === 0}
				<li class="text-sm text-ink-soft">{tr.search.noResults}</li>
			{:else}
				{#each results as result (result.slug)}
					<li class="rounded-xl bg-cream-100 p-3">
						<a href="{basePath}/{result.slug}" class="font-semibold text-ink hover:text-coral-dark"
							>{result.title}</a
						>
						<p class="text-sm text-ink-soft">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -- ts_headline output over admin-authored content only -->
							{@html result.snippet}
						</p>
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>
