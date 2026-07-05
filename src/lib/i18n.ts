export type Locale = 'en' | 'ru';

export const translations = {
	en: {
		common: {
			home: 'Home'
		},
		nav: {
			about: 'About me',
			blog: 'Blog',
			notes: 'Notes',
			projects: 'Projects',
			connect: 'Connect with me'
		},
		footer: {
			madeBy: 'Made by',
			authorName: "Ivan 'w1ldy0uth' Shurygin",
			poweredBy: 'Powered by',
			and: 'and'
		},
		home: {
			greeting: "Hi, I'm Ivan! 👋",
			bio: "I'm a software engineer and devops specialist with a passion for building scalable and maintainable applications. I'm interested in complex software development, infrastructure automation, and open-source software. I enjoy learning new technologies and sharing my knowledge with the community.",
			aboutCta: 'About me',
			posts: 'Posts',
			notes: 'Notes',
			projects: 'Projects',
			viewAll: 'View all',
			noPosts: 'No posts yet.',
			noNotes: 'No notes yet.',
			noProjects: 'No projects yet.'
		},
		blog: {
			title: 'Blog',
			rss: 'RSS',
			noPosts: 'No posts yet.'
		},
		notes: {
			title: 'Notes',
			noNotes: 'No notes yet.'
		},
		projects: {
			title: 'Projects',
			filterPlaceholder: 'Filter projects…',
			noMatching: 'No matching projects.',
			noProjects: 'No projects yet.',
			repo: 'Repo',
			live: 'Live'
		},
		tags: {
			tag: 'Tag',
			posts: 'Posts',
			notes: 'Notes',
			noPosts: 'No posts with this tag.',
			noNotes: 'No notes with this tag.'
		},
		search: {
			placeholder: 'Search…',
			searching: 'Searching…',
			noResults: 'No results.'
		},
		about: {
			title: 'About me',
			bioParagraphs: [
				"I'm Ivan Shurygin, also known online as w1ldy0uth or nevenoke - a full-stack developer, DevOps engineer, and software architect. I build things that work, and I care about understanding why they work: clean architecture, sane infrastructure, and automation of everything that doesn't need a human doing it by hand.",
				"Day to day I move across the whole stack - from Kotlin and Java backends to React and Svelte frontends - and spend a lot of time in the DevOps layer: Kubernetes, Terraform, Ansible, and the observability stack (Prometheus, Grafana, Loki) that tells you when something's actually wrong instead of guessing. I'm drawn to complex, high-load systems and the kind of system design problems where the constraints are as interesting as the solution.",
				'Outside of client and day-job work, I maintain a handful of open-source side projects: sondare, a network audit CLI built on Scapy; meetnotes, a local tool for transcribing and summarizing meetings; datadi, a distributed task queue written in Go; and python-underlying-concepts, a set of scripts that dig into how Python actually works under the hood.',
				"This site - nevenotes.tech - is itself one of those projects: a self-built CMS running on SvelteKit and Bun, because I'd rather understand every layer of the stack than hand it off to someone else's platform."
			],
			techStack: 'Tech stack',
			experience: 'Experience',
			resumeEn: 'Resume (EN)',
			resumeRu: 'Resume (RU)',
			interests: 'Interests',
			hardware: 'Hardware',
			stackCategories: {
				Languages: 'Languages',
				Frameworks: 'Frameworks',
				Testing: 'Testing',
				'Infrastructure & DevOps': 'Infrastructure & DevOps',
				Databases: 'Databases',
				Services: 'Services',
				Observability: 'Observability',
				'AI / ML': 'AI / ML',
				Tools: 'Tools',
				IDEs: 'IDEs'
			},
			jobs: [
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
						'Went from trainee to team lead of a large international project. Worked on projects ranging from internal company tools to large fintech projects across different tech stacks. Also involved in non-work activities: leading and mentoring internships, speaking at conferences, and internal mentoring and assessments.'
				},
				{
					role: 'Software Engineer',
					company: 'Freelance',
					period: 'November 2020 — May 2022',
					description:
						'Worked on many projects with Python (Django, Flask) and C++, including a CMS, dating apps, and game engine optimizations, among others.'
				}
			],
			interestsList: [
				'🌐 Complex web apps & high-load systems',
				'🖥️ Open-source desktop applications',
				'🏗️ System design & clean architecture',
				'🛠️ Automation of everything automatable',
				'⚙️ DevOps pipelines & infrastructure as code'
			],
			hardwareList: [
				{ category: 'Laptop', value: 'MacBook Air 13" M5 16GB' },
				{ category: 'Keyboard', value: 'Keychron K4' },
				{ category: 'Mouse', value: 'Razer Deathadder V2' },
				{ category: 'Monitor', value: 'Sanc 2K 75Hz' },
				{ category: 'Hub', value: 'Satechi Dual Dock Stand with 1TB Netac nVME SSD' },
				{
					category: 'Gaming PC (also a server)',
					value: 'Ryzen 7 5700X, 32GB RAM, RX5700XT, 1TB NVMe SSD, 1TB SATA SSD'
				}
			]
		}
	},
	ru: {
		common: {
			home: 'Главная'
		},
		nav: {
			about: 'Обо мне',
			blog: 'Блог',
			notes: 'Заметки',
			projects: 'Проекты',
			connect: 'Связаться со мной'
		},
		footer: {
			madeBy: 'Сделано',
			authorName: "Иваном 'w1ldy0uth' Шурыгиным",
			poweredBy: 'Работает на',
			and: 'и'
		},
		home: {
			greeting: 'Привет, я Иван! 👋',
			bio: 'Я инженер-программист и специалист по DevOps, увлечён созданием масштабируемых и поддерживаемых приложений. Мне интересна сложная разработка ПО, автоматизация инфраструктуры и open-source. Мне нравится изучать новые технологии и делиться знаниями с сообществом.',
			aboutCta: 'Обо мне',
			posts: 'Посты',
			notes: 'Заметки',
			projects: 'Проекты',
			viewAll: 'Смотреть все',
			noPosts: 'Постов пока нет.',
			noNotes: 'Заметок пока нет.',
			noProjects: 'Проектов пока нет.'
		},
		blog: {
			title: 'Блог',
			rss: 'RSS',
			noPosts: 'Постов пока нет.'
		},
		notes: {
			title: 'Заметки',
			noNotes: 'Заметок пока нет.'
		},
		projects: {
			title: 'Проекты',
			filterPlaceholder: 'Фильтр проектов…',
			noMatching: 'Совпадений не найдено.',
			noProjects: 'Проектов пока нет.',
			repo: 'Репозиторий',
			live: 'Сайт'
		},
		tags: {
			tag: 'Тег',
			posts: 'Посты',
			notes: 'Заметки',
			noPosts: 'Нет постов с этим тегом.',
			noNotes: 'Нет заметок с этим тегом.'
		},
		search: {
			placeholder: 'Поиск…',
			searching: 'Поиск…',
			noResults: 'Ничего не найдено.'
		},
		about: {
			title: 'Обо мне',
			bioParagraphs: [
				'Я Иван Шурыгин, также известный как w1ldy0uth или nevenoke — full-stack разработчик, DevOps-инженер и software-архитектор. Я создаю то, что работает, и мне важно понимать, почему это работает: чистая архитектура, разумная инфраструктура и автоматизация всего, что не обязательно делать руками.',
				'День за днём я работаю по всему стеку — от бэкендов на Kotlin и Java до фронтендов на React и Svelte — и много времени провожу в DevOps-слое: Kubernetes, Terraform, Ansible и стек наблюдаемости (Prometheus, Grafana, Loki), который говорит, что реально сломалось, вместо того чтобы гадать. Меня привлекают сложные высоконагруженные системы и задачи проектирования систем, где ограничения не менее интересны, чем само решение.',
				'Помимо работы с клиентами и основной занятости, я веду несколько open-source проектов: sondare — CLI для аудита сети на базе Scapy; meetnotes — локальный инструмент для расшифровки и суммаризации встреч; datadi — распределённая очередь задач на Go; и python-underlying-concepts — набор скриптов, разбирающих, как на самом деле устроен Python изнутри.',
				'Этот сайт — nevenotes.tech — сам по себе один из таких проектов: самописная CMS на SvelteKit и Bun, потому что я предпочитаю понимать каждый слой стека, а не отдавать это на откуп чужой платформе.'
			],
			techStack: 'Технологии',
			experience: 'Опыт работы',
			resumeEn: 'Резюме (EN)',
			resumeRu: 'Резюме (RU)',
			interests: 'Интересы',
			hardware: 'Железо',
			stackCategories: {
				Languages: 'Языки',
				Frameworks: 'Фреймворки',
				Testing: 'Тестирование',
				'Infrastructure & DevOps': 'Инфраструктура и DevOps',
				Databases: 'Базы данных',
				Services: 'Сервисы',
				Observability: 'Observability',
				'AI / ML': 'AI / ML',
				Tools: 'Инструменты',
				IDEs: 'IDE'
			},
			jobs: [
				{
					role: 'Software Engineer',
					company: 'Binary Brains',
					period: 'Март 2026 — настоящее время',
					description:
						'Работаю над контрактами и проектами компании как software-архитектор, разработчик (Kotlin, Spring Boot, Vue3) и DevOps.'
				},
				{
					role: 'Software Engineer',
					company: 'Фриланс',
					period: 'Ноябрь 2025 — Март 2026',
					description:
						'Работал над крупным хабом для фотографов и локаций. Добавлял новые функции и улучшал архитектуру большого проекта на Vue3, NestJS и .NET.'
				},
				{
					role: 'Software Engineer',
					company: 'Relex RU',
					period: 'Июнь 2022 — Ноябрь 2024',
					description:
						'Прошёл путь от стажёра до тимлида крупного международного проекта. Работал над проектами от внутренних инструментов компании до крупных финтех-проектов на разных стеках. Также занимался внерабочей деятельностью: руководил и менторил стажировки, выступал на конференциях, проводил внутренний менторинг и оценки.'
				},
				{
					role: 'Software Engineer',
					company: 'Фриланс',
					period: 'Ноябрь 2020 — Май 2022',
					description:
						'Работал над множеством проектов на Python (Django, Flask) и C++, включая CMS, дейтинг-приложения и оптимизацию игровых движков.'
				}
			],
			interestsList: [
				'🌐 Сложные веб-приложения и высоконагруженные системы',
				'🖥️ Open-source десктопные приложения',
				'🏗️ Системный дизайн и чистая архитектура',
				'🛠️ Автоматизация всего, что можно автоматизировать',
				'⚙️ DevOps-пайплайны и инфраструктура как код'
			],
			hardwareList: [
				{ category: 'Ноутбук', value: 'MacBook Air 13" M5 16GB' },
				{ category: 'Клавиатура', value: 'Keychron K4' },
				{ category: 'Мышь', value: 'Razer Deathadder V2' },
				{ category: 'Монитор', value: 'Sanc 2K 75Hz' },
				{ category: 'Хаб', value: 'Satechi Dual Dock Stand с SSD Netac nVME 1TB' },
				{
					category: 'Игровой ПК (он же сервер)',
					value: 'Ryzen 7 5700X, 32GB RAM, RX5700XT, 1TB NVMe SSD, 1TB SATA SSD'
				}
			]
		}
	}
} as const;

export function t(locale: Locale) {
	return translations[locale];
}
