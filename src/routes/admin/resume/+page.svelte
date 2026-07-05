<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let uploading = $state<Record<'en' | 'ru', boolean>>({ en: false, ru: false });
	let uploadError = $state<Record<'en' | 'ru', string>>({ en: '', ru: '' });

	async function handleUpload(e: Event, language: 'en' | 'ru') {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading[language] = true;
		uploadError[language] = '';

		const formData = new FormData();
		formData.append('file', file);
		formData.append('language', language);

		const res = await fetch('/api/upload/resume', { method: 'POST', body: formData });

		if (!res.ok) {
			const body = await res.json().catch(() => ({ message: 'Upload failed' }));
			uploadError[language] = body.message ?? 'Upload failed';
			uploading[language] = false;
			input.value = '';
			return;
		}

		uploading[language] = false;
		input.value = '';
		await invalidateAll();
	}
</script>

<svelte:head>
	<title>Admin · Resume</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<a href="/admin" class="text-sm underline">&larr; Admin</a>

	<h1 class="mt-4 text-xl font-semibold">Resume</h1>
	<p class="mt-1 text-sm text-gray-500">Upload PDF resumes for each language. Re-uploading replaces the existing file.</p>

	{#each [{ code: 'en' as const, label: 'English' }, { code: 'ru' as const, label: 'Russian' }] as lang (lang.code)}
		<div class="mt-6 rounded border p-4">
			<h2 class="font-semibold">{lang.label}</h2>

			{#if data[lang.code]}
				<p class="mt-1 text-sm">
					Current: <a href={data[lang.code]?.url} class="underline" target="_blank">{data[lang.code]?.filename}</a>
					<span class="text-gray-500">
						(updated {new Date(data[lang.code]!.updatedAt).toLocaleString()})
					</span>
				</p>
			{:else}
				<p class="mt-1 text-sm text-gray-500">No file uploaded yet.</p>
			{/if}

			<div class="mt-3 flex items-center gap-3">
				<label class="cursor-pointer text-sm underline">
					{uploading[lang.code] ? 'Uploading…' : 'Upload / Replace'}
					<input
						type="file"
						accept="application/pdf"
						class="hidden"
						disabled={uploading[lang.code]}
						onchange={(e) => handleUpload(e, lang.code)}
					/>
				</label>

				{#if data[lang.code]}
					<form
						method="POST"
						action="?/delete"
						use:enhance={() => async ({ update }) => update()}
					>
						<input type="hidden" name="language" value={lang.code} />
						<button type="submit" class="text-sm text-red-600 underline">Delete</button>
					</form>
				{/if}
			</div>

			{#if uploadError[lang.code]}
				<p class="mt-2 text-sm text-red-600">{uploadError[lang.code]}</p>
			{/if}
		</div>
	{/each}
</main>
