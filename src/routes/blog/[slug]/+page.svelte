<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/blog" class="text-sm underline">&larr; Blog</a>

	<h1 class="mt-4 text-2xl font-semibold">{data.title}</h1>
	<p class="text-sm text-gray-500">
		{data.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : ''}
	</p>

	<div class="prose mt-6 max-w-none">
		{@html data.html}
	</div>

	{#if data.tags.length > 0}
		<ul class="mt-6 flex flex-wrap gap-2">
			{#each data.tags as tag (tag.slug)}
				<li>
					<a href="/tags/{tag.slug}" class="rounded-full border px-3 py-1 text-sm">{tag.name}</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
