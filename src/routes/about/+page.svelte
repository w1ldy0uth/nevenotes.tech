<script lang="ts">
	const stack = [
		{
			category: 'Languages',
			items: ['Java', 'TypeScript', 'JavaScript', 'Kotlin', 'Python', 'Go', 'Rust', 'C++', 'SQL', 'Bash']
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
			items: ['PyTorch', 'scikit-learn', 'MLX', 'Hugging Face', 'LangChain', 'Claude', 'Ollama', 'LM Studio']
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
	];

	const experience = [
		{
			role: 'Software Engineer',
			company: 'Binary Brains',
			period: 'March 2026 — Present',
			description:
				'Working on contracts and company projects as a software architect, developer (Kotlin, Spring Boot, Vue3), and DevOps.'
		},
		{
			role: 'Software Engineer',
			company: 'Freelance',
			period: 'November 2025 — March 2026',
			description:
				'Worked on a large photography hub connecting photographers and locations. Added new features and improved the existing architecture of a large project built on Vue3, NestJS, and .NET.'
		},
		{
			role: 'Software Engineer',
			company: 'Relex RU',
			period: 'June 2022 — November 2024',
			description:
				"Went from trainee to team lead of a large international project. Worked on projects ranging from internal company tools to large fintech projects across different tech stacks. Also involved in non-work activities: leading and mentoring internships, speaking at conferences, and internal mentoring and assessments."
		},
		{
			role: 'Software Engineer',
			company: 'Freelance',
			period: 'November 2020 — May 2022',
			description:
				'Worked on many projects with Python (Django, Flask) and C++, including a CMS, dating apps, and game engine optimizations, among others.'
		}
	];

	const interests = [
		'🌐 Complex web apps & high-load systems',
		'🖥️ Open-source desktop applications',
		'🏗️ System design & clean architecture',
		'🛠️ Automation of everything automatable',
		'⚙️ DevOps pipelines & infrastructure as code'
	];

	const hardware = [
		{ category: 'Laptop', value: 'MacBook Ar 13" M5 16GB' },
		{ category: 'Keyboard', value: 'Keychron K4' },
		{ category: 'Mouse', value: 'Razer Deathadder V2' },
		{ category: 'Monitor', value: 'Sanc 2K 75Hz' },
		{ category: 'Hub', value: 'Satechi Dual Dock Stand with 1TB Netac nVME SSD' },
		{ category: 'Gaming PC (also a server)', value: 'Ruzen 7 5700X, 32GB RAM, RX5700XT, 1TB NVMe SSD, 1TB SATA SSD' }
	];
</script>

<svelte:head>
	<title>About · nevenotes.tech</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<a href="/" class="text-sm underline">&larr; Home</a>

	<h1 class="mt-4 text-3xl font-semibold">About me</h1>

	<div class="prose mt-6 max-w-none">
		<p>
			I'm Ivan Shurygin, also known online as <em>w1ldy0uth</em> or <em>nevenoke</em> - a full-stack developer, DevOps
			engineer, and software architect. I build things that work, and I care about
			understanding <em>why</em> they work: clean architecture, sane infrastructure, and
			automation of everything that doesn't need a human doing it by hand.
		</p>
		<p>
			Day to day I move across the whole stack - from Kotlin and Java backends to React and
			Svelte frontends — and spend a lot of time in the DevOps layer: Kubernetes, Terraform,
			Ansible, and the observability stack (Prometheus, Grafana, Loki) that tells you when
			something's actually wrong instead of guessing. I'm drawn to complex, high-load systems
			and the kind of system design problems where the constraints are as interesting as the
			solution.
		</p>
		<p>
			Outside of client and day-job work, I maintain a handful of open-source side projects:
			<a href="https://github.com/w1ldy0uth/sondare">sondare</a>, a network audit CLI built on
			Scapy; <a href="https://github.com/w1ldy0uth/meetnotes">meetnotes</a>, a local tool for
			transcribing and summarizing meetings; <a href="https://github.com/w1ldy0uth/datadi"
				>datadi</a
			>, a distributed task queue written in Go; and
			<a href="https://github.com/w1ldy0uth/python-underlying-concepts"
				>python-underlying-concepts</a
			>, a set of scripts that dig into how Python actually works under the hood.
		</p>
		<p>
			This site - <code>nevenotes.tech</code> - is itself one of those projects: a self-built
			CMS running on SvelteKit and Bun, because I'd rather understand every layer of the stack
			than hand it off to someone else's platform.
		</p>
	</div>

	<details class="mt-10 border-t pt-6" open>
		<summary class="cursor-pointer text-xl font-semibold">Tech stack</summary>
		{#each stack as group (group.category)}
			<div class="mt-6">
				<h3 class="text-sm font-semibold text-gray-500 uppercase">{group.category}</h3>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each group.items as tech (tech)}
						<li class="rounded-full border px-3 py-1 text-sm">{tech}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</details>

	<details class="mt-6 border-t pt-6">
		<summary class="cursor-pointer text-xl font-semibold">Experience</summary>
		<ul class="mt-6 flex flex-col gap-6">
			{#each experience as job (job.role + job.company + job.period)}
				<li>
					<p class="font-semibold">{job.role} · {job.company}</p>
					<p class="text-sm text-gray-500">{job.period}</p>
					<p class="mt-1 text-sm">{job.description}</p>
				</li>
			{/each}
		</ul>
	</details>

	<details class="mt-6 border-t pt-6">
		<summary class="cursor-pointer text-xl font-semibold">Interests</summary>
		<ul class="mt-6 flex flex-col gap-2">
			{#each interests as interest (interest)}
				<li class="text-sm">{interest}</li>
			{/each}
		</ul>
	</details>

	<details class="mt-6 border-t pt-6">
		<summary class="cursor-pointer text-xl font-semibold">Hardware</summary>
		<ul class="mt-6 flex flex-col gap-2">
			{#each hardware as item (item.category)}
				<li class="text-sm">
					<span class="font-semibold">{item.category}:</span>
					{item.value}
				</li>
			{/each}
		</ul>
	</details>
</main>
