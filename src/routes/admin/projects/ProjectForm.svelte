<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		project,
		error
	}: {
		project?: {
			slug: string;
			title: string;
			description: string | null;
			repoUrl: string | null;
			liveUrl: string | null;
			sortOrder: number;
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
			value={project?.title ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={project?.slug ?? ''}
			class="rounded border px-3 py-2"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Description</span>
		<textarea name="description" rows="3" class="rounded border px-3 py-2"
			>{project?.description ?? ''}</textarea
		>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Repo URL</span>
		<input type="url" name="repoUrl" value={project?.repoUrl ?? ''} class="rounded border px-3 py-2" />
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Live URL</span>
		<input type="url" name="liveUrl" value={project?.liveUrl ?? ''} class="rounded border px-3 py-2" />
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm">Sort order</span>
		<input
			type="number"
			name="sortOrder"
			value={project?.sortOrder ?? 0}
			class="rounded border px-3 py-2"
		/>
	</label>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}

	<div class="flex items-center gap-3">
		<button type="submit" class="rounded bg-black px-3 py-2 text-white">Save</button>

		{#if project}
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
