<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm font-medium text-coral-dark hover:underline">&larr; {tr.common.home}</a>

	<h1 class="mt-4 text-2xl font-bold text-ink">{tr.notes.title}</h1>

	<div class="mt-6">
		<SearchBox type="note" basePath="/notes" locale={data.locale} />
	</div>

	<ul class="flex flex-col gap-3">
		{#each data.notes as note (note.slug)}
			<li class="rounded-2xl bg-surface p-5 shadow-warm-sm">
				<a href="/notes/{note.slug}" class="text-lg font-semibold text-ink hover:text-coral-dark"
					>{note.title}</a
				>
				<p class="text-sm text-ink-soft">
					{new Date(note.createdAt).toLocaleDateString(data.locale === 'ru' ? 'ru-RU' : 'en-US')}
				</p>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">{tr.notes.noNotes}</li>
		{/each}
	</ul>
</main>
