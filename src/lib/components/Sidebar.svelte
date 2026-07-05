<script lang="ts">
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import AccentPicker from './AccentPicker.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();

	let tr = $derived(t(locale));

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
</script>

<aside class="hidden w-56 shrink-0 flex-col gap-10 py-12 pr-6 pl-12 md:flex">
	<div class="flex items-center justify-between">
		<a href="/" class="text-xl font-bold text-ink">Ivan Shurygin</a>
		<ThemeToggle />
	</div>

	<div class="flex flex-col gap-4">
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
		<h2 class="text-xs font-semibold tracking-wide text-ink-soft uppercase">{tr.nav.connect}</h2>
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
</aside>
