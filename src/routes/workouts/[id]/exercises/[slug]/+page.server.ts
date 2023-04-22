export const load = async ({ params }) => {
	const sets = await prisma.workoutExerciseSets.findMany();
	return { sets: sets };
};
