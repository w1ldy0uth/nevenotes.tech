import { Marked } from 'marked';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'bash', 'json', 'html', 'css', 'svelte', 'sql', 'markdown']
});

const marked = new Marked({
	async: false,
	renderer: {
		code({ text, lang }) {
			return highlighter.codeToHtml(text, {
				lang: highlighter.getLoadedLanguages().includes(lang ?? '') ? lang! : 'text',
				theme: 'github-dark'
			});
		}
	}
});

export function renderMarkdown(source: string): string {
	return marked.parse(source, { async: false });
}
