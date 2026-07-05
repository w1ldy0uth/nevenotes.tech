<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Posts</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm underline">&larr; Admin</a>

	<div class="mt-4 flex items-center justify-between">
		<h1 class="text-xl font-semibold">Posts</h1>
		<a href="/admin/posts/new" class="text-sm underline">New post</a>
	</div>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.posts as post (post.id)}
			<li>
				<a href="/admin/posts/{post.id}" class="underline">{post.title}</a>
				<span class="text-sm text-gray-500">/{post.slug}</span>
				<span
					class="rounded px-2 py-0.5 text-xs {post.status === 'published'
						? 'bg-green-100 text-green-800'
						: 'bg-gray-100 text-gray-600'}"
				>
					{post.status}
				</span>
			</li>
		{:else}
			<li class="text-sm text-gray-500">No posts yet.</li>
		{/each}
	</ul>
</main>
