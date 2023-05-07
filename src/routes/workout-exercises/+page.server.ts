import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const workoutExercises = await prisma.workoutExercise.findMany({
		where: {
			workoutId: Number(url.searchParams.get('workoutId'))
		},
		include: {
			exercise: true
		}
	});
	return { workoutExercises: workoutExercises };
};

export const actions = {
	default: async ({ request, url }) => {
		const form = await request.formData();
		const exerciseId = form.get('exercise');

		// add exercise to workout
		try {
			await prisma.workoutExercise.create({
				data: {
					workoutId: Number(url.searchParams.get('workoutId')),
					exerciseId: Number(exerciseId)
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add workout exercise' });
		}

		return { status: 201 };
	}
};
