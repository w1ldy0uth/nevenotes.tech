<script lang="ts">
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import AccentPicker from './AccentPicker.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();

	let tr = $derived(t(locale));
	let open = $state(false);

	let navLinks = $derived([
		{ href: '/about', label: tr.nav.about },
		{ href: '/blog', label: tr.nav.blog },
		{ href: '/notes', label: tr.nav.notes },
		{ href: '/projects', label: tr.nav.projects }
	]);

	const socials = [
		{ label: 'GitHub', href: 'https://github.com/w1ldy0uth' },
		{ label: 'X', href: 'https://x.com/nevenoke' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-shurygin' },
		{ label: 'Telegram', href: 'https://t.me/nevenoke' },
		{ label: 'Email', href: 'mailto:shurygin1vs@gmail.com' }
	];

	$effect(() => {
		// reading pathname here closes the menu whenever navigation happens
		if (page.url.pathname) open = false;
	});
</script>

<div class="flex flex-col border-b border-cream-100 md:hidden">
	<div class="flex items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-ink">Ivan Shurygin</a>
		<div class="flex items-center gap-1">
			<ThemeToggle />
			<button
				type="button"
				onclick={() => (open = !open)}
				aria-label="Toggle menu"
				aria-expanded={open}
				class="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-cream-100"
			>
				{#if open}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5">
						<path
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							d="M6 6l12 12M18 6L6 18"
						/>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5">
						<path
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							d="M4 7h16M4 12h16M4 17h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if open}
		<div class="flex flex-col gap-6 px-6 pb-6">
			<div class="flex items-center gap-4">
				<LocaleToggle {locale} />
				<AccentPicker />
			</div>

			<nav class="flex flex-col gap-1">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="rounded-full px-3 py-1.5 text-sm font-medium transition {page.url.pathname ===
							link.href || page.url.pathname.startsWith(link.href + '/')
							? 'bg-coral text-white'
							: 'text-ink hover:bg-cream-100'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<div>
				<h2 class="text-xs font-semibold tracking-wide text-ink-soft uppercase">
					{tr.nav.connect}
				</h2>
				<div class="mt-3 flex flex-col gap-2">
					{#each socials as social (social.label)}
						<a
							href={social.href}
							target="_blank"
							rel="noreferrer noopener"
							class="text-sm font-medium text-coral-dark hover:underline"
						>
							{social.label}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
