<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));

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
	<a href="/" class="text-sm font-medium text-coral-dark hover:underline">&larr; {tr.common.home}</a
	>

	<h1 class="mt-4 text-2xl font-bold text-ink">{tr.projects.title}</h1>

	<input
		type="search"
		bind:value={query}
		placeholder={tr.projects.filterPlaceholder}
		class="mt-6 w-full rounded-full bg-surface px-4 py-2 shadow-warm-sm outline-none focus:ring-2 focus:ring-coral"
	/>

	<ul class="mt-6 flex flex-col gap-4">
		{#each filteredProjects as project (project.slug)}
			<li class="rounded-2xl bg-surface p-5 shadow-warm-sm">
				<a
					href="/projects/{project.slug}"
					class="text-lg font-semibold text-ink hover:text-coral-dark">{project.title}</a
				>
				{#if project.description}
					<p class="mt-1 text-sm text-ink">{project.description}</p>
				{/if}
				<div class="mt-2 flex gap-3 text-sm">
					{#if project.repoUrl}
						<a href={project.repoUrl} class="font-medium text-coral-dark hover:underline"
							>{tr.projects.repo}</a
						>
					{/if}
					{#if project.liveUrl}
						<a href={project.liveUrl} class="font-medium text-coral-dark hover:underline"
							>{tr.projects.live}</a
						>
					{/if}
				</div>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">
				{query.trim() ? tr.projects.noMatching : tr.projects.noProjects}
			</li>
		{/each}
	</ul>
</main>
