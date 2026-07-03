<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Projects</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-semibold">Projects</h1>
		<a href="/admin/projects/new" class="text-sm underline">New project</a>
	</div>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.projects as project (project.id)}
			<li>
				<span class="text-sm text-gray-500">#{project.sortOrder}</span>
				<a href="/admin/projects/{project.id}" class="underline">{project.title}</a>
				<span class="text-sm text-gray-500">/{project.slug}</span>
			</li>
		{:else}
			<li class="text-sm text-gray-500">No projects yet.</li>
		{/each}
	</ul>
</main>
