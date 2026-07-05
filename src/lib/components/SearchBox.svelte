<script lang="ts">
	type Result = { slug: string; title: string; snippet: string };

	let { type, basePath }: { type: 'post' | 'note'; basePath: string } = $props();

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
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`);
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
		placeholder="Search…"
		class="w-full rounded border px-3 py-2"
	/>

	{#if query.trim()}
		<ul class="mt-3 flex flex-col gap-3">
			{#if loading}
				<li class="text-sm text-gray-500">Searching…</li>
			{:else if results.length === 0}
				<li class="text-sm text-gray-500">No results.</li>
			{:else}
				{#each results as result (result.slug)}
					<li>
						<a href="{basePath}/{result.slug}" class="underline">{result.title}</a>
						<p class="text-sm text-gray-600">{@html result.snippet}</p>
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>
