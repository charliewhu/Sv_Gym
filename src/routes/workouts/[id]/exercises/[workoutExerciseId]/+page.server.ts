import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	async function getWorkoutExercise() {
		const workoutExercise = await prisma.workoutExercise.findUnique({
			where: {
				id: Number(params.workoutExerciseId)
			},
			include: {
				exercise: true
			}
		});
		if (!workoutExercise) {
			throw error(404, 'Could not find workout exercise');
		}
		return workoutExercise;
	}

	return { workoutExercise: getWorkoutExercise() };
};
