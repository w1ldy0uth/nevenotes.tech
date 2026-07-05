<script lang="ts">
	import ProjectForm from '../ProjectForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · New project</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/projects" class="text-sm font-medium text-coral-dark hover:underline">&larr; Projects</a>
	<h1 class="mt-4 mb-6 text-xl font-bold text-ink">New project</h1>

	<ProjectForm error={form?.error} />
</main>
