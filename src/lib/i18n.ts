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
			bio: "I'm a full-stack software engineer and DevOps specialist. Here you'll find information about me, my work, and my projects, along with my articles and thoughts. Feel free to connect with me, or subscribe to the RSS feed on my blog to follow my latest posts.",
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
			bioIntro:
				'I go by Ivan Shurygin, or sometimes w1ldy0uth and nevenoke online. My work sits somewhere between full-stack development, DevOps, and software architecture, and what ties it together is a habit of asking why something works, not just getting it to work.',
			bioWorkStyle:
				"Most days I move across the whole stack, from backend and frontend development to the DevOps layer, keeping systems observable so I know what's actually broken instead of guessing. I'm drawn to complex, high-load systems, especially when the constraints are as interesting as the solution.",
			bioProjects: {
				before:
					'Outside my day job, I keep a handful of open-source projects going. You can find them on the ',
				after: ' page.'
			},
			bioSite:
				"This site is one of them too, a self-built CMS on SvelteKit and Bun. I'd rather understand every layer of my own stack than hand it off to someone else's platform.",
			bioPersonal:
				'Outside of code, I run long distances, work out regularly, and enjoy digging into higher mathematics for fun. I read a lot, mostly classic literature along with non-fiction on psychology and philosophy, and I spend plenty of time watching movies, series, and anime. I also play single-player video games and like learning about game design.',
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
			bio: 'Я full-stack разработчик и DevOps специалист. Здесь можно найти информацию обо мне, моей работе и проектах, а также статьи и мысли. Буду рад знакомству — напишите мне что-нибудь или подпишитесь на RSS блога, чтобы следить за новыми публикациями.',
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
			bioIntro:
				'Я Иван Шурыгин, в сети иногда w1ldy0uth или nevenoke. Моя работа сочетает full-stack разработку, DevOps и software-архитектуру, а объединяет всё это привычка спрашивать, почему что-то работает, а не просто добиваться того, чтобы оно работало.',
			bioWorkStyle:
				'Обычно я работаю по всему стеку: от бэкенда и фронтенда до DevOps-слоя, стараясь делать системы наблюдаемыми, чтобы точно знать, что сломалось, а не гадать. Меня привлекают сложные высоконагруженные системы, особенно когда ограничения не менее интересны, чем само решение.',
			bioProjects: {
				before:
					'Помимо основной работы, я веду несколько open-source проектов. Их можно найти на странице ',
				after: '.'
			},
			bioSite:
				'Этот сайт тоже один из них: самописная CMS на SvelteKit и Bun. Я предпочитаю понимать каждый слой своего стека, а не отдавать это на откуп чужой платформе.',
			bioPersonal:
				'Помимо программирования, я бегаю на длинные дистанции, регулярно тренируюсь и люблю разбираться в высшей математике для себя. Много читаю, в основном классическую литературу и non-fiction по психологии и философии, а также часто смотрю фильмы, сериалы и аниме. Ещё играю в однопользовательские видеоигры и люблю изучать геймдизайн.',
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
