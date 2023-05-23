import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions = {
	default: async ({ request, url }) => {
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

		const workoutId = url.searchParams.get('workoutId');

		if (!workoutId) throw redirect(301, `/exercises`);

		throw redirect(301, `/workouts/${workoutId}`);
	}
};
