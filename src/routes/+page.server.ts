import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions = {
	default: async () => {
		let workout;

		try {
			workout = await prisma.workout.create({ data: {} });
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'could not create food' });
		}

		throw redirect(301, `/workouts/${workout.id}`);
	}
};
