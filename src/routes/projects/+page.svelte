<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let query = $state('');

	let filteredProjects = $derived(
		query.trim()
			? data.projects.filter((project) => {
					const haystack = `${project.title} ${project.description ?? ''}`.toLowerCase();
					return haystack.includes(query.trim().toLowerCase());
				})
			: data.projects
	);
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm underline">&larr; Home</a>

	<h1 class="mt-4 text-2xl font-semibold">Projects</h1>

	<input
		type="search"
		bind:value={query}
		placeholder="Filter projects…"
		class="mt-6 w-full rounded border px-3 py-2"
	/>

	<ul class="mt-6 flex flex-col gap-4">
		{#each filteredProjects as project (project.slug)}
			<li>
				<a href="/projects/{project.slug}" class="text-lg underline">{project.title}</a>
				{#if project.description}
					<p class="text-sm">{project.description}</p>
				{/if}
				<div class="mt-1 flex gap-3 text-sm">
					{#if project.repoUrl}
						<a href={project.repoUrl} class="underline">Repo</a>
					{/if}
					{#if project.liveUrl}
						<a href={project.liveUrl} class="underline">Live</a>
					{/if}
				</div>
			</li>
		{:else}
			<li class="text-sm text-gray-500">
				{query.trim() ? 'No matching projects.' : 'No projects yet.'}
			</li>
		{/each}
	</ul>
</main>
