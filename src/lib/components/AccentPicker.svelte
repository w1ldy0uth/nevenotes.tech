<script lang="ts">
	const accents = [
		{ id: 'red', label: 'Red', swatch: '#ff6b5b' },
		{ id: 'green', label: 'Green', swatch: '#22a06b' },
		{ id: 'blue', label: 'Blue', swatch: '#3b82f6' },
		{ id: 'violet', label: 'Violet', swatch: '#8b5cf6' }
	];

	let active = $state('red');

	$effect(() => {
		active = document.documentElement.dataset.accent ?? 'red';
	});

	function select(id: string) {
		active = id;
		document.documentElement.dataset.accent = id;
		localStorage.setItem('accent', id);
	}
</script>

<div class="flex items-center gap-3">
	{#each accents as accent (accent.id)}
		<button
			type="button"
			onclick={() => select(accent.id)}
			aria-label="{accent.label} accent"
			class="h-5 w-5 rounded-full transition {active === accent.id
				? 'ring-2 ring-ink ring-offset-2 ring-offset-cream'
				: ''}"
			style="background-color: {accent.swatch}"
		></button>
	{/each}
</div>
