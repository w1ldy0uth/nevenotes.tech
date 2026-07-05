import { sql } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tags } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db.execute(sql`
		select
			t.id,
			t.name,
			t.slug,
			(select count(*) from post_tags pt where pt.tag_id = t.id) as post_count,
			(select count(*) from note_tags nt where nt.tag_id = t.id) as note_count
		from tags t
		order by t.name asc
	`);

	return {
		tags: rows as unknown as {
			id: number;
			name: string;
			slug: string;
			post_count: number;
			note_count: number;
		}[]
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!Number.isInteger(id)) {
			return fail(400, { error: 'Invalid tag id.' });
		}

		await db.execute(sql`delete from tags where id = ${id}`);

		return { success: true };
	}
};
