import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('deleting sets', async ({ page }) => {
	// arrange (add sets to db)
	const workout = await prisma.workout.create({ data: {} });
	const exercise = await prisma.exercise.create({ data: { name: 'exercise' } });
	const workoutExercise = await prisma.workoutExercise.create({
		data: { workout: workout.id, exercise: exercise.id }
	});
	await prisma.workoutExerciseSet.createMany({
		data: [
			{ workoutExercise: workoutExercise.id, weight: 100, reps: 5, rir: 2 },
			{ workoutExercise: workoutExercise.id, weight: 110, reps: 8, rir: 3 }
		]
	});

	// act: go to sets list page
	await page.goto(`sets?workoutExerciseId=${workoutExercise.id}`);

	// assert: set delete buttons visible
	let deleteBtns = page.getByTestId('deleteSetBtn');
	await expect(deleteBtns).toHaveCount(2);

	// act: click delete button
	await page.getByTestId('deleteSetBtn').first().click();

	// assert set deleted
	deleteBtns = page.getByTestId('deleteSetBtn');
	await expect(deleteBtns).toHaveCount(1);
});
