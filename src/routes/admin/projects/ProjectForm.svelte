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

<form method="POST" action="?/save" use:enhance class="flex flex-col gap-3 rounded-2xl bg-surface p-6 shadow-warm-sm">
	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Title</span>
		<input
			type="text"
			name="title"
			required
			value={project?.title ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Slug</span>
		<input
			type="text"
			name="slug"
			required
			value={project?.slug ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Description</span>
		<textarea
			name="description"
			rows="3"
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
			>{project?.description ?? ''}</textarea
		>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Repo URL</span>
		<input
			type="url"
			name="repoUrl"
			value={project?.repoUrl ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Live URL</span>
		<input
			type="url"
			name="liveUrl"
			value={project?.liveUrl ?? ''}
			class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
		/>
	</label>

	<label class="flex flex-col gap-1">
		<span class="text-sm text-ink-soft">Sort order</span>
		<input
			type="number"
			name="sortOrder"
			value={project?.sortOrder ?? 0}
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

		{#if project}
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
