import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import { workoutExerciseSetSchema } from '$lib/schema';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params }) => {
	try {
		const set = await prisma.workoutExerciseSet.findUniqueOrThrow({
			where: {
				id: Number(params.id)
			}
		});

		return {
			form: await superValidate(set, workoutExerciseSetSchema)
		};
	} catch (err) {
		throw error(500, 'Could not find set');
	}
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, workoutExerciseSetSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		let set;

		try {
			set = await prisma.workoutExerciseSet.update({
				where: {
					id: Number(event.params.id)
				},
				data: {
					weight: form.data.weight,
					reps: form.data.reps,
					rir: form.data.rir
				}
			});
		} catch (err) {
			throw error(500, 'Could not update set');
		}
		throw redirect(302, `/workout-exercises/${set.workoutExercise}`);
	}
};
