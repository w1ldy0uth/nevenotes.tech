<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Notes</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm font-medium text-coral-dark hover:underline">&larr; Admin</a>

	<div class="mt-4 flex items-center justify-between">
		<h1 class="text-xl font-bold text-ink">Notes</h1>
		<a href="/admin/notes/new" class="text-sm font-medium text-coral-dark hover:underline"
			>New note</a
		>
	</div>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.notes as note (note.id)}
			<li class="flex items-center gap-2 rounded-xl bg-surface p-4 shadow-warm-sm">
				<a href="/admin/notes/{note.id}" class="font-semibold text-ink hover:text-coral-dark"
					>{note.title}</a
				>
				<span class="text-sm text-ink-soft">/{note.slug}</span>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">No notes yet.</li>
		{/each}
	</ul>
</main>
