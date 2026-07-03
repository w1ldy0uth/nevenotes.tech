<script lang="ts">
	import ProjectForm from '../ProjectForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · Edit project</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/projects" class="text-sm underline">&larr; Projects</a>
	<h1 class="mt-4 mb-6 text-xl font-semibold">Edit project</h1>

	{#if form?.success}
		<p class="mb-4 text-sm text-green-600">Saved.</p>
	{/if}

	<ProjectForm project={data.project} error={form?.error} />
</main>
