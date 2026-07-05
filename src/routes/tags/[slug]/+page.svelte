<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Tag: {data.tag.name}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/" class="text-sm underline">&larr; Home</a>

	<h1 class="mt-4 text-2xl font-semibold">Tag: {data.tag.name}</h1>

	<h2 class="mt-8 text-lg font-semibold">Posts</h2>
	<ul class="mt-2 flex flex-col gap-2">
		{#each data.posts as post (post.slug)}
			<li>
				<a href="/blog/{post.slug}" class="underline">{post.title}</a>
			</li>
		{:else}
			<li class="text-sm text-gray-500">No posts with this tag.</li>
		{/each}
	</ul>

	<h2 class="mt-8 text-lg font-semibold">Notes</h2>
	<ul class="mt-2 flex flex-col gap-2">
		{#each data.notes as note (note.slug)}
			<li>
				<a href="/notes/{note.slug}" class="underline">{note.title}</a>
			</li>
		{:else}
			<li class="text-sm text-gray-500">No notes with this tag.</li>
		{/each}
	</ul>
</main>
