import { error, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { workoutExerciseSetSchema } from '$lib/schema';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params }) => {
	const form = await superValidate(workoutExerciseSetSchema);
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

	return { form, workoutExercise: getWorkoutExercise() };
};

export const actions = {
	create: async (event) => {
		const form = await superValidate(event, workoutExerciseSetSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// add set to db
		try {
			await prisma.workoutExerciseSet.create({
				data: {
					workoutExercise: Number(event.params.id),
					weight: form.data.weight,
					reps: form.data.reps,
					rir: form.data.rir
				}
			});
		} catch (err) {
			return fail(500, { message: 'could not add set' });
		}

		return { form, status: 201 };
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		try {
			await prisma.workoutExerciseSet.delete({ where: { id: Number(id) } });
		} catch (err) {
			return fail(500, { message: 'could not delete set' });
		}

		const returnForm = await superValidate(workoutExerciseSetSchema);

		return { form: returnForm, status: 204 };
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

		const returnForm = await superValidate(workoutExerciseSetSchema);
		return { form: returnForm, status: 204 };
	},
	previousWorkout: async ({ request }) => {
		const form = await request.formData();
		const workoutExerciseId = form.get('workoutExerciseId');
		const exerciseId = form.get('exerciseId');

		try {
			const sets = await prisma.workoutExercise.findMany({
				where: { exercise: Number(exerciseId) },
				take: 1,
				skip: 1,
				orderBy: {
					workout: 'desc'
				},
				include: {
					workoutExerciseSets: true
				}
			});

			const newSets = sets[0].workoutExerciseSets.map((obj) => ({
				weight: Number(obj.weight),
				reps: Number(obj.reps),
				rir: Number(obj.rir),
				workoutExercise: Number(workoutExerciseId)
			}));

			await prisma.workoutExerciseSet.createMany({
				data: newSets
			});
		} catch (err) {
			console.log('could not copy sets');
			console.log(err);
			return fail(500, { message: 'could not copy sets' });
		}

		const returnForm = await superValidate(workoutExerciseSetSchema);
		return { form: returnForm, status: 204 };
	}
};
