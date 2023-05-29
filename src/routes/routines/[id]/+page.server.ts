import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		return {
			routine: await prisma.routine.findUniqueOrThrow({
				where: {
					id: Number(params.id)
				},
				include: {
					RoutineExercises: {
						include: {
							Exercise: true
						}
					}
				}
			})
		};
	} catch (err) {
		throw error(404, { message: 'Could not find Routine' });
	}
};

export const actions = {
	create: async ({ request, params }) => {
		const form = await request.formData();
		const exerciseId = form.get('exercise');

		// add exercise to workout
		try {
			await prisma.routineExercise.create({
				data: {
					routine: Number(params.id),
					exercise: Number(exerciseId)
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add exercise to routine' });
		}

		return { status: 201 };
	}
};
