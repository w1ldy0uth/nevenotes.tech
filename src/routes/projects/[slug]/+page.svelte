<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.project.title}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/projects" class="text-sm underline">&larr; Projects</a>

	<h1 class="mt-4 text-2xl font-semibold">{data.project.title}</h1>

	{#if data.project.description}
		<p class="mt-4">{data.project.description}</p>
	{/if}

	<div class="mt-4 flex gap-4 text-sm">
		{#if data.project.repoUrl}
			<a href={data.project.repoUrl} class="underline">Repo</a>
		{/if}
		{#if data.project.liveUrl}
			<a href={data.project.liveUrl} class="underline">Live</a>
		{/if}
	</div>
</main>
