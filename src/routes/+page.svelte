<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>nevenotes.tech</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<section>
		<h1 class="text-3xl font-semibold">Hi, I'm Ivan!</h1>
		<p class="mt-3 text-gray-600">
			I'm a software engineer and devops specialist with a passion for building scalable and maintainable applications.
			I'm interested in complex software development, infrastructure automation, and open-source software.
			I enjoy learning new technologies and sharing my knowledge with the community.
		</p>
		<a href="/about" class="mt-2 inline-block text-sm underline">About me &rarr;</a>
	</section>

	<section class="mt-12">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">Posts</h2>
			<a href="/blog" class="text-sm underline">View all</a>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.recentPosts as post (post.slug)}
				<li>
					<a href="/blog/{post.slug}" class="underline">{post.title}</a>
					{#if post.excerpt}
						<p class="text-sm text-gray-600">{post.excerpt}</p>
					{/if}
				</li>
			{:else}
				<li class="text-sm text-gray-500">No posts yet.</li>
			{/each}
		</ul>
	</section>

	<section class="mt-12">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">Notes</h2>
			<a href="/notes" class="text-sm underline">View all</a>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.recentNotes as note (note.slug)}
				<li>
					<a href="/notes/{note.slug}" class="underline">{note.title}</a>
				</li>
			{:else}
				<li class="text-sm text-gray-500">No notes yet.</li>
			{/each}
		</ul>
	</section>

	<section class="mt-12">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">Projects</h2>
			<a href="/projects" class="text-sm underline">View all</a>
		</div>
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.featuredProjects as project (project.slug)}
				<li>
					<a href="/projects/{project.slug}" class="underline">{project.title}</a>
					{#if project.description}
						<p class="text-sm text-gray-600">{project.description}</p>
					{/if}
				</li>
			{:else}
				<li class="text-sm text-gray-500">No projects yet.</li>
			{/each}
		</ul>
	</section>
</main>
