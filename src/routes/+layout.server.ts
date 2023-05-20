import { prisma } from '$lib/server/prisma';

export const load = async () => {
	return { exercises: await prisma.exercise.findMany() };
};
