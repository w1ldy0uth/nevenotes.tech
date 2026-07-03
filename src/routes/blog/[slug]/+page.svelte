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
</main>
