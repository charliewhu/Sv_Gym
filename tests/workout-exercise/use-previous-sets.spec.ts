import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('Use sets from a previous workout', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';
	const setsValues = [
		{ weight: 100, reps: 5, rir: 3 },
		{ weight: 110, reps: 4, rir: 2 },
		{ weight: 120, reps: 3, rir: 1 }
	];

	// arrange: db
	const exercise = await prisma.exercise.create({ data: { name: exerciseName } });
	const workout = await prisma.workout.create({ data: {} });
	const workoutExercise = await prisma.workoutExercise.create({
		data: { workout: workout.id, exercise: exercise.id }
	});
	const setsInput = setsValues.map((obj) => ({ ...obj, workoutExercise: workoutExercise.id }));
	const workoutExerciseSets = await prisma.workoutExerciseSet.createMany({ data: setsInput });

	// arrange: go to Workout Exercise page
	await page.goto(`workout-exercises/${workoutExercise.id}`);

	// act: click repeat previous sets button
	await page.locator('button', { hasText: 'Repeat Previous Workout' }).click();

	// assert: sets appear and have the same values as previous
});
