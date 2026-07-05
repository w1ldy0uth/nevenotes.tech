<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold text-ink">Admin</h1>
		<form method="POST" action="/admin/logout">
			<button type="submit" class="text-sm font-medium text-coral-dark hover:underline"
				>Log out</button
			>
		</form>
	</div>

	<p class="mt-4 text-sm text-ink-soft">Signed in as {data.user?.email}</p>

	<div class="mt-6 flex flex-wrap gap-3">
		<a href="/admin/posts" class="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-warm-sm hover:text-coral-dark">Manage posts</a>
		<a href="/admin/notes" class="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-warm-sm hover:text-coral-dark">Manage notes</a>
		<a href="/admin/projects" class="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-warm-sm hover:text-coral-dark">Manage projects</a>
		<a href="/admin/tags" class="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-warm-sm hover:text-coral-dark">Manage tags</a>
		<a href="/admin/resume" class="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-warm-sm hover:text-coral-dark">Manage resume</a>
	</div>
</main>
