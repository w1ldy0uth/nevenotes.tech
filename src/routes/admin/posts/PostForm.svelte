<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		post,
		error
	}: {
		post?: {
			slug: string;
			title: string;
			excerpt: string | null;
			bodyMd: string;
			status: 'draft' | 'published';
		};
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
			value={post?.title ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={post?.slug ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Excerpt</span>
		<input type="text" name="excerpt" value={post?.excerpt ?? ''} class="rounded border px-3 py-2" />
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Status</span>
		<select name="status" class="rounded border px-3 py-2">
			<option value="draft" selected={(post?.status ?? 'draft') === 'draft'}>Draft</option>
			<option value="published" selected={post?.status === 'published'}>Published</option>
		</select>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Body (Markdown)</span>
		<textarea name="bodyMd" required rows="16" class="rounded border px-3 py-2 font-mono text-sm"
			>{post?.bodyMd ?? ''}</textarea
		>
	</label>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}

	<div class="flex items-center gap-3">
		<button type="submit" class="rounded bg-black px-3 py-2 text-white">Save</button>

		{#if post}
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
