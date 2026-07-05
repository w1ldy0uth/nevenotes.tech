<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm underline">&larr; Home</a>

	<h1 class="mt-4 text-2xl font-semibold">Blog</h1>

	<div class="mt-6">
		<SearchBox type="post" basePath="/blog" />
	</div>

	<ul class="flex flex-col gap-4">
		{#each data.posts as post (post.slug)}
			<li>
				<a href="/blog/{post.slug}" class="text-lg underline">{post.title}</a>
				<p class="text-sm text-gray-500">
					{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
				</p>
				{#if post.excerpt}
					<p class="text-sm">{post.excerpt}</p>
				{/if}
			</li>
		{:else}
			<li class="text-sm text-gray-500">No posts yet.</li>
		{/each}
	</ul>
</main>
