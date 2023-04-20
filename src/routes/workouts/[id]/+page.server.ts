import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const exercises = await prisma.exercise.findMany();
	const workoutExercises = await prisma.workoutexercise.findMany({
		where: {
			workoutId: params.id
		}
	});
	return { exercises: exercises, workoutExercises: workoutExercises };
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const exerciseId = form.get('exercise');

		// add exercise to workout
		try {
			await prisma.workoutexercise.create({
				data: {
					workoutId: params.id,
					exerciseId: exerciseId
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add wokout exercise' });
		}

		return { status: 201 };
	}
};
