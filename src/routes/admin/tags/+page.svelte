<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Tags</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm font-medium text-coral-dark hover:underline">&larr; Admin</a>

	<h1 class="mt-4 text-xl font-bold text-ink">Tags</h1>
	<p class="mt-1 text-sm text-ink-soft">
		Tags are created automatically from the post/note editors. Delete one here to remove it
		everywhere it's used.
	</p>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.tags as tag (tag.id)}
			<li class="flex items-center justify-between rounded-xl bg-surface p-4 shadow-warm-sm">
				<div>
					<a href="/tags/{tag.slug}" class="font-semibold text-ink hover:text-coral-dark"
						>{tag.name}</a
					>
					<span class="text-sm text-ink-soft">
						{tag.post_count} post{tag.post_count === 1 ? '' : 's'}, {tag.note_count} note{tag.note_count ===
						1
							? ''
							: 's'}
					</span>
				</div>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={tag.id} />
					<button type="submit" class="text-sm text-red-600 hover:underline">Delete</button>
				</form>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">No tags yet.</li>
		{/each}
	</ul>
</main>
