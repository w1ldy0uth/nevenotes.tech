<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));
</script>

<svelte:head>
	<title>nevenotes.tech</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<section class="rounded-2xl bg-surface p-8 shadow-warm">
		<h1 class="text-3xl font-bold text-ink">{tr.home.greeting}</h1>
		<p class="mt-3 leading-relaxed text-ink-soft">
			{tr.home.bio}
		</p>
		<a
			href="/about"
			class="mt-4 inline-flex items-center gap-1 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-coral-dark"
		>
			{tr.home.aboutCta} &rarr;
		</a>
	</section>

	<section class="mt-8 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-ink">{tr.home.posts}</h2>
			<a href="/blog" class="text-sm font-medium text-coral-dark hover:underline"
				>{tr.home.viewAll}</a
			>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.recentPosts as post (post.slug)}
				<li class="rounded-xl bg-cream-100 p-4">
					<a href="/blog/{post.slug}" class="font-semibold text-ink hover:text-coral-dark"
						>{post.title}</a
					>
					{#if post.excerpt}
						<p class="mt-1 text-sm text-ink-soft">{post.excerpt}</p>
					{/if}
				</li>
			{:else}
				<li class="text-sm text-ink-soft">{tr.home.noPosts}</li>
			{/each}
		</ul>
	</section>

	<section class="mt-8 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-ink">{tr.home.notes}</h2>
			<a href="/notes" class="text-sm font-medium text-coral-dark hover:underline"
				>{tr.home.viewAll}</a
			>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.recentNotes as note (note.slug)}
				<li class="rounded-xl bg-cream-100 p-4">
					<a href="/notes/{note.slug}" class="font-semibold text-ink hover:text-coral-dark"
						>{note.title}</a
					>
				</li>
			{:else}
				<li class="text-sm text-ink-soft">{tr.home.noNotes}</li>
			{/each}
		</ul>
	</section>

	<section class="mt-8 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-ink">{tr.home.projects}</h2>
			<a href="/projects" class="text-sm font-medium text-coral-dark hover:underline"
				>{tr.home.viewAll}</a
			>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.featuredProjects as project (project.slug)}
				<li class="rounded-xl bg-cream-100 p-4">
					<a href="/projects/{project.slug}" class="font-semibold text-ink hover:text-coral-dark"
						>{project.title}</a
					>
					{#if project.description}
						<p class="mt-1 text-sm whitespace-pre-line text-ink-soft">{project.description}</p>
					{/if}
				</li>
			{:else}
				<li class="text-sm text-ink-soft">{tr.home.noProjects}</li>
			{/each}
		</ul>
	</section>
</main>
