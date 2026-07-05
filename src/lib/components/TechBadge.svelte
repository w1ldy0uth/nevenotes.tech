<script lang="ts">
	import { techMeta, readableTextColor } from '$lib/techIcons';

	let { name }: { name: string } = $props();

	let meta = $derived(techMeta[name] ?? { icon: null, color: '#6b5f52' });
	let textColor = $derived(readableTextColor(meta.color));
</script>

<li
	class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
	style="background-color: {meta.color}; color: {textColor}"
>
	{#if meta.icon}
		<svg viewBox="0 0 24 24" width="14" height="14" fill={textColor}>
			<path d={meta.icon.path} />
		</svg>
	{/if}
	{name}
</li>
