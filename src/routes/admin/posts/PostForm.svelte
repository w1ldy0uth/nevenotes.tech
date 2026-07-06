<script lang="ts">
	import { enhance } from '$app/forms';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let {
		post,
		error
	}: {
		post?: {
			slug: string;
			titleEn: string;
			titleRu: string | null;
			excerptEn: string | null;
			excerptRu: string | null;
			bodyMdEn: string;
			bodyMdRu: string | null;
			status: 'draft' | 'published';
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
			value={post?.titleEn ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Title (RU)</span>
		<input
			type="text"
			name="titleRu"
			value={post?.titleRu ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={post?.slug ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Excerpt (EN)</span>
		<input
			type="text"
			name="excerptEn"
			value={post?.excerptEn ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Excerpt (RU)</span>
		<input
			type="text"
			name="excerptRu"
			value={post?.excerptRu ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Status</span>
		<select
			name="status"
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		>
			<option value="draft" selected={(post?.status ?? 'draft') === 'draft'}>Draft</option>
			<option value="published" selected={post?.status === 'published'}>Published</option>
		</select>
	</label>

	<MarkdownEditor name="bodyMdEn" value={post?.bodyMdEn ?? ''} label="Body (EN, Markdown)" />

	<MarkdownEditor
		name="bodyMdRu"
		value={post?.bodyMdRu ?? ''}
		label="Body (RU, Markdown)"
		required={false}
	/>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Tags (comma-separated)</span>
		<input
			type="text"
			name="tags"
			value={post?.tags ?? ''}
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

		{#if post}
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
