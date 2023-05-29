import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	return { routines: await prisma.routine.findMany({}) };
};

export const actions = {
	create: async ({ request }) => {
		const form = await request.formData();
		const data = Object.fromEntries(form);

		let routine;
		try {
			routine = await prisma.routine.create({ data: { name: String(data.name) } });
		} catch (err) {
			return fail(404, { message: 'Could not create routine' });
		}

		throw redirect(301, `/routines/${routine.id}`);
	},
	startWorkout: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		let exercises;
		try {
			exercises = await prisma.routineExercise.findMany({
				where: { routine: Number(id) },
				select: { exercise: true }
			});
		} catch (err) {
			return fail(400, { message: 'Could not find routine' });
		}

		let workout;
		try {
			workout = await prisma.workout.create({
				data: {
					workoutExercises: {
						createMany: {
							data: exercises
						}
					}
				}
			});
		} catch (err) {
			return fail(500, { message: 'Could not create workout' });
		}

		throw redirect(301, `/workouts/${workout.id}`);
	}
};
