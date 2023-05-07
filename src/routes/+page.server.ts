import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async () => {
	const workouts = await prisma.workout.findMany();

	return { workouts };
};

export const actions = {
	default: async () => {
		let workout;

		try {
			workout = await prisma.workout.create({ data: {} });
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'could not create food' });
		}

		throw redirect(301, `/workout-exercises?workoutId=${workout.id}`);
	}
};
