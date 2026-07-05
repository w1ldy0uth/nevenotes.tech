<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin · Posts</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm font-medium text-coral-dark hover:underline">&larr; Admin</a>

	<div class="mt-4 flex items-center justify-between">
		<h1 class="text-xl font-bold text-ink">Posts</h1>
		<a href="/admin/posts/new" class="text-sm font-medium text-coral-dark hover:underline">New post</a>
	</div>

	<ul class="mt-6 flex flex-col gap-2">
		{#each data.posts as post (post.id)}
			<li class="flex items-center gap-2 rounded-xl bg-surface p-4 shadow-warm-sm">
				<a href="/admin/posts/{post.id}" class="font-semibold text-ink hover:text-coral-dark"
					>{post.title}</a
				>
				<span class="text-sm text-ink-soft">/{post.slug}</span>
				<span
					class="rounded-full px-2 py-0.5 text-xs {post.status === 'published'
						? 'bg-green-100 text-green-800'
						: 'bg-cream-100 text-ink-soft'}"
				>
					{post.status}
				</span>
			</li>
		{:else}
			<li class="text-sm text-ink-soft">No posts yet.</li>
		{/each}
	</ul>
</main>
