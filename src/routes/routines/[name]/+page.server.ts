import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		return {
			routine: await prisma.routine.findUniqueOrThrow({
				where: {
					name: params.name
				}
			})
		};
	} catch (err) {
		throw error(404, { message: 'Could not find Routine' });
	}
};
