<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin login</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-4">
	<h1 class="text-xl font-semibold">Admin login</h1>

	<form method="POST" use:enhance class="flex flex-col gap-3">
		<label class="flex flex-col gap-1">
			<span class="text-sm">Email</span>
			<input
				type="email"
				name="email"
				required
				autocomplete="email"
				class="rounded border px-3 py-2"
			/>
		</label>

		<label class="flex flex-col gap-1">
			<span class="text-sm">Password</span>
			<input
				type="password"
				name="password"
				required
				autocomplete="current-password"
				class="rounded border px-3 py-2"
			/>
		</label>

		{#if form?.error}
			<p class="text-sm text-red-600">{form.error}</p>
		{/if}

		<button type="submit" class="rounded bg-black px-3 py-2 text-white">Log in</button>
	</form>
</main>
