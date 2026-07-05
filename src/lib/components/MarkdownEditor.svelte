<script lang="ts">
	let { name, value = '', rows = 16 }: { name: string; value?: string; rows?: number } = $props();

	let textareaEl: HTMLTextAreaElement;
	let content = $state(value);
	let uploading = $state(false);
	let uploadError = $state('');
	let previewHtml = $state('');

	$effect(() => {
		const markdown = content;
		const handle = setTimeout(async () => {
			const res = await fetch('/api/preview', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ markdown })
			});
			if (res.ok) {
				previewHtml = (await res.json()).html;
			}
		}, 300);

		return () => clearTimeout(handle);
	});

	async function handleFileChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		uploadError = '';

		const formData = new FormData();
		formData.append('file', file);

		const res = await fetch('/api/upload', { method: 'POST', body: formData });

		if (!res.ok) {
			const body = await res.json().catch(() => ({ message: 'Upload failed' }));
			uploadError = body.message ?? 'Upload failed';
			uploading = false;
			input.value = '';
			return;
		}

		const { url } = await res.json();
		const markdown = `![${file.name}](${url})`;
		const start = textareaEl.selectionStart ?? content.length;
		const end = textareaEl.selectionEnd ?? content.length;

		content = content.slice(0, start) + markdown + content.slice(end);

		uploading = false;
		input.value = '';
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<span class="text-sm text-ink-soft">Body (Markdown)</span>
		<label class="cursor-pointer text-sm font-medium text-coral-dark hover:underline">
			{uploading ? 'Uploading…' : 'Upload image'}
			<input
				type="file"
				accept="image/png,image/jpeg,image/webp,image/gif"
				class="hidden"
				onchange={handleFileChange}
				disabled={uploading}
			/>
		</label>
	</div>

	{#if uploadError}
		<p class="text-sm text-red-600">{uploadError}</p>
	{/if}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<textarea
			bind:this={textareaEl}
			bind:value={content}
			{name}
			required
			{rows}
			class="rounded-lg bg-cream-100 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-coral"
		></textarea>

		<div
			class="prose prose-sm prose-neutral dark:prose-invert max-w-none overflow-auto rounded-lg bg-cream-100 px-3 py-2"
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- server-rendered markdown, admin-authored only -->
			{@html previewHtml}
		</div>
	</div>
</div>
