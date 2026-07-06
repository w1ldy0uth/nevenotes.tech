<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>{data.project.title}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/projects" class="text-sm font-medium text-coral-dark hover:underline"
		>&larr; {tr.projects.title}</a
	>

	<div class="mt-6 rounded-2xl bg-surface p-8 shadow-warm">
		<h1 class="text-2xl font-bold text-ink">{data.project.title}</h1>

		{#if data.project.descriptionHtml}
			<div class="prose prose-neutral dark:prose-invert mt-4 max-w-none">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- server-rendered markdown, admin-authored only -->
				{@html data.project.descriptionHtml}
			</div>
		{/if}

		<div class="mt-4 flex gap-4 text-sm">
			{#if data.project.repoUrl}
				<a href={data.project.repoUrl} class="font-medium text-coral-dark hover:underline"
					>{tr.projects.repo}</a
				>
			{/if}
			{#if data.project.liveUrl}
				<a href={data.project.liveUrl} class="font-medium text-coral-dark hover:underline"
					>{tr.projects.live}</a
				>
			{/if}
		</div>
	</div>
</main>
