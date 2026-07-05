<script lang="ts">
	// Not a $derived: reading `document` must stay client-only (would throw during SSR).
	// eslint-disable-next-line svelte/prefer-writable-derived
	let isDark = $state(false);

	$effect(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label="Toggle dark mode"
	class="flex h-8 w-8 items-center justify-center rounded-full text-lg transition hover:bg-cream-100"
>
	{isDark ? '🌙' : '☀️'}
</button>
