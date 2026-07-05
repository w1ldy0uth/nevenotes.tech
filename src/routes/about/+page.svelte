<script lang="ts">
	import { t } from '$lib/i18n';
	import TechBadge from '$lib/components/TechBadge.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t(data.locale));

	const stack = [
		{
			category: 'Languages',
			items: [
				'Java',
				'TypeScript',
				'JavaScript',
				'Kotlin',
				'Python',
				'Go',
				'Rust',
				'C++',
				'SQL',
				'Bash'
			]
		},
		{
			category: 'Frameworks',
			items: [
				'Spring Boot',
				'React',
				'Vue',
				'Angular',
				'Svelte',
				'Next.js',
				'NestJS',
				'Ktor',
				'Django',
				'Flask',
				'FastAPI'
			]
		},
		{
			category: 'Testing',
			items: ['JUnit', 'Testcontainers', 'Pytest', 'Jest', 'Cypress', 'Kover', 'Gatling']
		},
		{
			category: 'Infrastructure & DevOps',
			items: [
				'Docker',
				'Kubernetes',
				'Helm',
				'Istio',
				'Terraform',
				'Ansible',
				'Linux',
				'GitLab CI',
				'GitHub Actions'
			]
		},
		{
			category: 'Databases',
			items: ['PostgreSQL', 'Oracle', 'YDB', 'MongoDB', 'ClickHouse', 'Neo4j']
		},
		{
			category: 'Services',
			items: [
				'Kafka',
				'RabbitMQ',
				'Celery',
				'Redis',
				'MinIO',
				'Nginx',
				'Traefik',
				'Elasticsearch',
				'Keycloak',
				'Vault',
				'pgAdmin'
			]
		},
		{
			category: 'Observability',
			items: ['ELK Stack', 'Prometheus', 'Grafana', 'Loki', 'Alloy', 'Tempo']
		},
		{
			category: 'AI / ML',
			items: [
				'PyTorch',
				'scikit-learn',
				'MLX',
				'Hugging Face',
				'LangChain',
				'Claude',
				'Ollama',
				'LM Studio'
			]
		},
		{
			category: 'Tools',
			items: [
				'Git',
				'Zsh',
				'Maven',
				'Gradle',
				'Make',
				'npm',
				'Bun',
				'Postman',
				'Bruno',
				'Wireshark',
				'nmap',
				'Obsidian',
				'Figma',
				'Jupyter',
				'n8n',
				'Jira'
			]
		},
		{
			category: 'IDEs',
			items: ['Neovim', 'VS Code', 'IntelliJ IDEA', 'PyCharm']
		}
	] as const;
</script>

<svelte:head>
	<title>About · nevenotes.tech</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<a href="/" class="text-sm font-medium text-coral-dark hover:underline">&larr; {tr.common.home}</a
	>

	<h1 class="mt-4 text-3xl font-bold text-ink">{tr.about.title}</h1>

	<div
		class="prose prose-neutral dark:prose-invert mt-6 max-w-none rounded-2xl bg-surface p-8 shadow-warm"
	>
		{#each tr.about.bioParagraphs as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>

	<details class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm" open>
		<summary class="cursor-pointer text-lg font-bold text-ink">{tr.about.techStack}</summary>
		{#each stack as group (group.category)}
			<div class="mt-6">
				<h3 class="text-xs font-semibold tracking-wide text-ink-soft uppercase">
					{tr.about.stackCategories[group.category]}
				</h3>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each group.items as tech (tech)}
						<TechBadge name={tech} />
					{/each}
				</ul>
			</div>
		{/each}
	</details>

	<details class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<summary class="cursor-pointer text-lg font-bold text-ink">{tr.about.experience}</summary>

		{#if data.resumeEn || data.resumeRu}
			<div class="mt-6 flex gap-3">
				{#if data.resumeEn}
					<a
						href={data.resumeEn}
						class="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral-dark"
						target="_blank">{tr.about.resumeEn}</a
					>
				{/if}
				{#if data.resumeRu}
					<a
						href={data.resumeRu}
						class="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral-dark"
						target="_blank">{tr.about.resumeRu}</a
					>
				{/if}
			</div>
		{/if}

		<ul class="mt-6 flex flex-col gap-6">
			{#each tr.about.jobs as job (job.role + job.company + job.period)}
				<li class="rounded-xl bg-cream-100 p-4">
					<p class="font-semibold text-ink">{job.role} · {job.company}</p>
					<p class="text-sm text-ink-soft">{job.period}</p>
					<p class="mt-1 text-sm text-ink">{job.description}</p>
				</li>
			{/each}
		</ul>
	</details>

	<details class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<summary class="cursor-pointer text-lg font-bold text-ink">{tr.about.interests}</summary>
		<ul class="mt-6 flex flex-col gap-2">
			{#each tr.about.interestsList as interest (interest)}
				<li class="text-sm text-ink">{interest}</li>
			{/each}
		</ul>
	</details>

	<details class="mt-6 rounded-2xl bg-surface p-6 shadow-warm-sm">
		<summary class="cursor-pointer text-lg font-bold text-ink">{tr.about.hardware}</summary>
		<ul class="mt-6 flex flex-col gap-2">
			{#each tr.about.hardwareList as item (item.category)}
				<li class="text-sm text-ink">
					<span class="font-semibold">{item.category}:</span>
					{item.value}
				</li>
			{/each}
		</ul>
	</details>
</main>
