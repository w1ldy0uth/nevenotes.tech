<script lang="ts">
	import NoteForm from '../NoteForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · New note</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/notes" class="text-sm font-medium text-coral-dark hover:underline">&larr; Notes</a
	>
	<h1 class="mt-4 mb-6 text-xl font-bold text-ink">New note</h1>

	<NoteForm error={form?.error} />
</main>
