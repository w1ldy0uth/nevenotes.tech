<script lang="ts">
	import { enhance } from '$app/forms';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let {
		note,
		error
	}: {
		note?: {
			slug: string;
			titleEn: string;
			titleRu: string | null;
			bodyMdEn: string;
			bodyMdRu: string | null;
			tags?: string;
		};
		error?: string;
	} = $props();
</script>

<form
	method="POST"
	action="?/save"
	use:enhance
	class="flex flex-col gap-3 rounded-2xl bg-surface p-6 shadow-warm-sm"
>
	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Title (EN)</span>
		<input
			type="text"
			name="titleEn"
			required
			value={note?.titleEn ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Title (RU)</span>
		<input
			type="text"
			name="titleRu"
			value={note?.titleRu ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={note?.slug ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<MarkdownEditor name="bodyMdEn" value={note?.bodyMdEn ?? ''} label="Body (EN, Markdown)" />

	<MarkdownEditor
		name="bodyMdRu"
		value={note?.bodyMdRu ?? ''}
		label="Body (RU, Markdown)"
		required={false}
	/>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Tags (comma-separated)</span>
		<input
			type="text"
			name="tags"
			value={note?.tags ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}

	<div class="flex items-center gap-3">
		<button
			type="submit"
			class="rounded-full bg-coral px-4 py-2 font-semibold text-white transition hover:bg-coral-dark"
			>Save</button
		>

		{#if note}
			<button
				type="submit"
				formaction="?/delete"
				class="rounded-full border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
			>
				Delete
			</button>
		{/if}
	</div>
</form>
