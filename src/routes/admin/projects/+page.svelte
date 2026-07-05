<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Projects</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm font-medium text-coral-dark hover:underline">&larr; Admin</a>

	<div class="mt-4 flex items-center justify-between">
		<h1 class="text-xl font-bold text-ink">Projects</h1>
		<a href="/admin/projects/new" class="text-sm font-medium text-coral-dark hover:underline"
			>New project</a
		>
	</div>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.projects as project (project.id)}
			<li class="flex items-center gap-2 rounded-xl bg-surface p-4 shadow-warm-sm">
				<span class="text-sm text-ink-soft">#{project.sortOrder}</span>
				<a href="/admin/projects/{project.id}" class="font-semibold text-ink hover:text-coral-dark"
					>{project.title}</a
				>
				<span class="text-sm text-ink-soft">/{project.slug}</span>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">No projects yet.</li>
		{/each}
	</ul>
</main>
