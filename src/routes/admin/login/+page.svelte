<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin login</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-4">
	<div class="rounded-2xl bg-surface p-8 shadow-warm">
		<h1 class="text-xl font-bold text-ink">Admin login</h1>

		<form method="POST" use:enhance class="mt-4 flex flex-col gap-3">
			<label class="flex flex-col gap-1">
				<span class="text-sm text-ink-soft">Email</span>
				<input
					type="email"
					name="email"
					required
					autocomplete="email"
					class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
				/>
			</label>

			<label class="flex flex-col gap-1">
				<span class="text-sm text-ink-soft">Password</span>
				<input
					type="password"
					name="password"
					required
					autocomplete="current-password"
					class="rounded-lg bg-cream-100 px-3 py-2 outline-none focus:ring-2 focus:ring-coral"
				/>
			</label>

			{#if form?.error}
				<p class="text-sm text-red-600">{form.error}</p>
			{/if}

			<button
				type="submit"
				class="rounded-full bg-coral px-3 py-2 font-semibold text-white transition hover:bg-coral-dark"
				>Log in</button
			>
		</form>
	</div>
</main>
