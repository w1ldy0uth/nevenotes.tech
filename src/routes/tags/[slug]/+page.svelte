<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>Tag: {data.tag.name}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm font-medium text-coral-dark hover:underline">&larr; {tr.common.home}</a
	>

	<h1 class="mt-4 text-2xl font-bold text-ink">{tr.tags.tag}: {data.tag.name}</h1>

	<div class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<h2 class="text-lg font-bold text-ink">{tr.tags.posts}</h2>
		<ul class="mt-3 flex flex-col gap-2">
			{#each data.posts as post (post.slug)}
				<li>
					<a href="/blog/{post.slug}" class="font-medium text-coral-dark hover:underline"
						>{post.title}</a
					>
				</li>
			{:else}
				<li class="text-sm text-ink-soft">{tr.tags.noPosts}</li>
			{/each}
		</ul>
	</div>

	<div class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<h2 class="text-lg font-bold text-ink">{tr.tags.notes}</h2>
		<ul class="mt-3 flex flex-col gap-2">
			{#each data.notes as note (note.slug)}
				<li>
					<a href="/notes/{note.slug}" class="font-medium text-coral-dark hover:underline"
						>{note.title}</a
					>
				</li>
			{:else}
				<li class="text-sm text-ink-soft">{tr.tags.noNotes}</li>
			{/each}
		</ul>
	</div>
</main>
