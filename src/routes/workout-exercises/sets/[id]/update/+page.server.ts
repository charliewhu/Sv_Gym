import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		return {
			set: await prisma.workoutExerciseSet.findUniqueOrThrow({
				where: {
					id: Number(params.id)
				}
			})
		};
	} catch (err) {
		throw error(500, 'Could not find set');
	}
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const weight = form.get('weight');
		const reps = form.get('reps');
		const rir = form.get('rir');

		let set;

		try {
			set = await prisma.workoutExerciseSet.update({
				where: {
					id: Number(params.id)
				},
				data: {
					weight: Number(weight),
					reps: Number(reps),
					rir: Number(rir)
				}
			});
		} catch (err) {
			throw error(500, 'Could not update set');
		}

		throw redirect(302, `/workout-exercises/${set.workoutExercise}`);
	}
};
