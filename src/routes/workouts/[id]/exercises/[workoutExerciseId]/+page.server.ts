import { error, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	async function getWorkoutExercise() {
		const workoutExercise = await prisma.workoutExercise.findUnique({
			where: {
				id: Number(params.workoutExerciseId)
			},
			include: {
				exercise: true,
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
	default: async ({ request, params }) => {
		const form = await request.formData();
		const weight = form.get('weight');
		const reps = form.get('reps');
		const rir = form.get('rir');

		// add exercise to workout
		try {
			await prisma.workoutExerciseSet.create({
				data: {
					workoutExerciseId: Number(params.workoutExerciseId),
					weight: Number(weight),
					reps: Number(reps),
					rir: Number(rir)
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add set' });
		}

		return { status: 201 };
	}
};
