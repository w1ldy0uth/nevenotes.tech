<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let showSidebar = $derived(!page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col">
	<div class="mx-auto flex w-full max-w-5xl flex-1">
		{#if showSidebar}
			<Sidebar locale={data.locale} />
		{/if}
		<div class="min-w-0 flex-1">
			{@render children()}
		</div>
	</div>
	<Footer locale={data.locale} />
</div>
