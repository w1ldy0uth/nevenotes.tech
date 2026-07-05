<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>Blog</title>
	<link rel="alternate" type="application/rss+xml" title="nevenotes.tech — Blog" href="/blog/rss.xml" />
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm font-medium text-coral-dark hover:underline">&larr; {tr.common.home}</a>

	<div class="mt-4 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-ink">{tr.blog.title}</h1>
		<a href="/blog/rss.xml" class="text-sm font-medium text-coral-dark hover:underline">{tr.blog.rss}</a>
	</div>

	<div class="mt-6">
		<SearchBox type="post" basePath="/blog" locale={data.locale} />
	</div>

	<ul class="flex flex-col gap-4">
		{#each data.posts as post (post.slug)}
			<li class="rounded-2xl bg-surface p-5 shadow-warm-sm">
				<a href="/blog/{post.slug}" class="text-lg font-semibold text-ink hover:text-coral-dark"
					>{post.title}</a
				>
				<p class="text-sm text-ink-soft">
					{post.publishedAt
						? new Date(post.publishedAt).toLocaleDateString(data.locale === 'ru' ? 'ru-RU' : 'en-US')
						: ''}
				</p>
				{#if post.excerpt}
					<p class="mt-2 text-sm text-ink">{post.excerpt}</p>
				{/if}
			</li>
		{:else}
			<li class="text-sm text-ink-soft">{tr.blog.noPosts}</li>
		{/each}
	</ul>
</main>
