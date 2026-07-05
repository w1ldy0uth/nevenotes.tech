<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/notes" class="text-sm font-medium text-coral-dark hover:underline"
		>&larr; {tr.notes.title}</a
	>

	<div class="mt-6 rounded-2xl bg-surface p-8 shadow-warm">
		<h1 class="text-2xl font-bold text-ink">{data.title}</h1>
		<p class="text-sm text-ink-soft">
			{new Date(data.createdAt).toLocaleDateString(data.locale === 'ru' ? 'ru-RU' : 'en-US')}
		</p>

		<div class="prose prose-neutral dark:prose-invert mt-6 max-w-none">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- server-rendered markdown, admin-authored only -->
			{@html data.html}
		</div>

		{#if data.tags.length > 0}
			<ul class="mt-6 flex flex-wrap gap-2">
				{#each data.tags as tag (tag.slug)}
					<li>
						<a href="/tags/{tag.slug}" class="rounded-full bg-cream-100 px-3 py-1 text-sm text-ink"
							>{tag.name}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>
