<script lang="ts">
	const socials = [
		{ label: 'X', href: 'https://x.com/nevenoke' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-shurygin' },
		{ label: 'Telegram', href: 'https://t.me/nevenoke' }
	];
</script>

<footer class="mx-auto max-w-2xl px-4 py-8 text-sm text-gray-500">
	<div class="flex gap-4">
		{#each socials as social (social.label)}
			<a href={social.href} class="underline" target="_blank" rel="noreferrer noopener">
				{social.label}
			</a>
		{/each}
	</div>

	<p class="mt-4">
		<a
			href="https://github.com/w1ldy0uth/nevenotes.tech"
			class="underline"
			target="_blank"
			rel="noreferrer noopener">Made by</a
		>
		Ivan 'w1ldy0uth' Shurygin. Powered by
		<a href="https://svelte.dev" class="underline" target="_blank" rel="noreferrer noopener"
			>SvelteKit</a
		>.
	</p>
</footer>
