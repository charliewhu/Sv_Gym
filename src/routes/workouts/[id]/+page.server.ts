import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const workoutExercises = await prisma.workoutExercise.findMany({
		where: {
			workoutId: Number(params.id)
		},
		include: {
			exercise: true
		}
	});
	return { workoutExercises: workoutExercises };
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const exerciseId = form.get('exercise');

		// add exercise to workout
		try {
			await prisma.workoutExercise.create({
				data: {
					workoutId: Number(params.id),
					exerciseId: Number(exerciseId)
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add workout exercise' });
		}

		return { status: 201 };
	}
};
