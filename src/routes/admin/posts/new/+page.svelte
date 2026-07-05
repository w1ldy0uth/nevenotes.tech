<script lang="ts">
	import PostForm from '../PostForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin · New post</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin/posts" class="text-sm font-medium text-coral-dark hover:underline">&larr; Posts</a>
	<h1 class="mt-4 mb-6 text-xl font-bold text-ink">New post</h1>

	<PostForm error={form?.error} />
</main>
