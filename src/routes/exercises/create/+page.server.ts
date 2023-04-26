import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name');

		try {
			await prisma.exercise.create({
				data: {
					name: String(name)
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'could not create exercise' });
		}

		throw redirect(301, '/exercises');
	}
};
