<script lang="ts">
	import { enhance } from '$app/forms';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let {
		note,
		error
	}: {
		note?: { slug: string; title: string; bodyMd: string; tags?: string };
		error?: string;
	} = $props();
</script>

<form method="POST" action="?/save" use:enhance class="flex flex-col gap-3">
	<label class="flex flex-col gap-1">
		<span class="text-sm">Title</span>
		<input
			type="text"
			name="title"
			required
			value={note?.title ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={note?.slug ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<MarkdownEditor name="bodyMd" value={note?.bodyMd ?? ''} />

	<label class="flex flex-col gap-1">
		<span class="text-sm">Tags (comma-separated)</span>
		<input type="text" name="tags" value={note?.tags ?? ''} class="rounded border px-3 py-2" />
	</label>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}

	<div class="flex items-center gap-3">
		<button type="submit" class="rounded bg-black px-3 py-2 text-white">Save</button>

		{#if note}
			<button
				type="submit"
				formaction="?/delete"
				class="rounded border border-red-600 px-3 py-2 text-red-600"
			>
				Delete
			</button>
		{/if}
	</div>
</form>
