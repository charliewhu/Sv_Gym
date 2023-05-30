import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('Use sets from a previous workout', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';
	const setsValues: { weight: number; reps: number; rir: number }[] = [
		{ weight: 9, reps: 6, rir: 3 },
		{ weight: 8, reps: 5, rir: 2 },
		{ weight: 7, reps: 4, rir: 1 }
	];

	// arrange: past workout
	const exercise = await prisma.exercise.create({ data: { name: exerciseName } });
	const prevWorkout = await prisma.workout.create({ data: {} });
	const prevWorkoutExercise = await prisma.workoutExercise.create({
		data: { workout: prevWorkout.id, exercise: exercise.id }
	});
	const setsInput = setsValues.map((obj) => ({ ...obj, workoutExercise: prevWorkoutExercise.id }));
	await prisma.workoutExerciseSet.createMany({ data: setsInput });

	// arrange: current workout
	const workout = await prisma.workout.create({ data: {} });
	const workoutExercise = await prisma.workoutExercise.create({
		data: { workout: workout.id, exercise: exercise.id }
	});

	// arrange: go to Workout Exercise page
	await page.goto(`workout-exercises/${workoutExercise.id}`);

	// act: click repeat previous sets button
	await page.locator('button', { hasText: 'Repeat Previous Workout' }).click();

	// assert: sets appear and have the same values as previous
	for (const i in setsValues) {
		for (const property in setsValues[i]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await expect(page.getByText(`${setsValues[i][property]}`)).toBeVisible();
		}
	}
});
