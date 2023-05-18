import { prisma } from '$lib/server/prisma';

export const load = async ({ params }) => {
	return {
		set: await prisma.workoutExerciseSet.findUnique({
			where: {
				id: Number(params.id)
			}
		})
	};
};
