import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const data = Object.fromEntries(form);

		let routine;
		try {
			routine = await prisma.routine.create({ data: { name: String(data.name) } });
		} catch (err) {
			return fail(404, { message: 'Could not create routine' });
		}

		throw redirect(301, `/routines/${routine.id}`);
	}
};
