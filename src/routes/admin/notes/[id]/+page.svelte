<script lang="ts">
	import NoteForm from '../NoteForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · Edit note</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/notes" class="text-sm underline">&larr; Notes</a>
	<h1 class="mt-4 mb-6 text-xl font-semibold">Edit note</h1>

	{#if form?.success}
		<p class="mb-4 text-sm text-green-600">Saved.</p>
	{/if}

	<NoteForm note={data.note} error={form?.error} />
</main>
