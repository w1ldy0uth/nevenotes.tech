<script lang="ts">
	import PostForm from '../PostForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · Edit post</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/posts" class="text-sm font-medium text-coral-dark hover:underline">&larr; Posts</a>
	<h1 class="mt-4 mb-6 text-xl font-bold text-ink">Edit post</h1>

	{#if form?.success}
		<p class="mb-4 text-sm text-green-600">Saved.</p>
	{/if}

	<PostForm post={data.post} error={form?.error} />
</main>
