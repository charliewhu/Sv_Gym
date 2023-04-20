import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const exercises = await prisma.exercise.findMany();
	return { exercises: exercises };
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
