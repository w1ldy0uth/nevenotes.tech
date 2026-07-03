<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="text-2xl font-semibold">Projects</h1>

	<ul class="mt-6 flex flex-col gap-4">
		{#each data.projects as project (project.slug)}
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
			<li class="text-sm text-gray-500">No projects yet.</li>
		{/each}
	</ul>
</main>
