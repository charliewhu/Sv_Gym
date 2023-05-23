import { error, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	async function getWorkoutExercise() {
		const workoutExercise = await prisma.workoutExercise.findUnique({
			where: {
				id: Number(params.id)
			},
			include: {
				Exercise: true,
				workoutExerciseSets: true
			}
		});
		if (!workoutExercise) {
			throw error(404, 'Could not find workout exercise');
		}
		return workoutExercise;
	}

	return { workoutExercise: getWorkoutExercise() };
};

export const actions = {
	create: async ({ request, params }) => {
		const form = await request.formData();
		const formData = Object.fromEntries(form);

		// add exercise to workout
		try {
			await prisma.workoutExerciseSet.create({
				data: {
					workoutExercise: Number(params.id),
					weight: Number(formData.weight),
					reps: Number(formData.reps),
					rir: Number(formData.rir)
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add set' });
		}

		return { status: 201 };
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		try {
			await prisma.workoutExerciseSet.delete({ where: { id: Number(id) } });
		} catch (err) {
			return fail(500, { message: 'could not delete set' });
		}

		return { status: 204 };
	},
	repeat: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		try {
			const set = await prisma.workoutExerciseSet.findUniqueOrThrow({ where: { id: Number(id) } });
			await prisma.workoutExerciseSet.create({
				data: {
					workoutExercise: set.workoutExercise,
					weight: set.weight,
					reps: set.reps,
					rir: set.rir
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not delete set' });
		}

		return { status: 204 };
	}
};
