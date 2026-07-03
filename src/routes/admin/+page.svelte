<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-semibold">Admin</h1>
		<form method="POST" action="/admin/logout">
			<button type="submit" class="text-sm underline">Log out</button>
		</form>
	</div>

	<p class="mt-4 text-sm">Signed in as {data.user?.email}</p>
</main>
