<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="text-2xl font-semibold">Notes</h1>

	<ul class="mt-6 flex flex-col gap-3">
		{#each data.notes as note (note.slug)}
			<li>
				<a href="/notes/{note.slug}" class="text-lg underline">{note.title}</a>
				<p class="text-sm text-gray-500">
					{new Date(note.createdAt).toLocaleDateString()}
				</p>
			</li>
		{:else}
			<li class="text-sm text-gray-500">No notes yet.</li>
		{/each}
	</ul>
</main>
