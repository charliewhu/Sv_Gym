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
	create: async ({ request, url }) => {
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
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		try {
			await prisma.workoutExercise.delete({ where: { id: Number(id) } });
		} catch (err) {
			return fail(500, { message: 'could not delete workout exercise' });
		}

		return { status: 204 };
	}
};
