import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async () => {
	const workouts = await prisma.workout.findMany();

	return { workouts };
};

export const actions = {
	create: async () => {
		let workout;

		try {
			workout = await prisma.workout.create({ data: {} });
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'could not create food' });
		}

		throw redirect(301, `/workout-exercises?workoutId=${workout.id}`);
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		try {
			await prisma.workout.delete({ where: { id: Number(id) } });
		} catch (err) {
			return fail(500, { message: 'could not delete workout exercise' });
		}

		return { status: 204 };
	}
};
