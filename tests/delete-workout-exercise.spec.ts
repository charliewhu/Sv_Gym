import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('deleting workout exercises', async ({ page }) => {
	// arrange (add workout exercise to db)
	const workout = await prisma.workout.create({ data: {} });
	const exercise = await prisma.exercise.create({ data: { name: 'exercise' } });
	await prisma.workoutExercise.createMany({
		data: [
			{ workout: workout.id, exercise: exercise.id },
			{ workout: workout.id, exercise: exercise.id }
		]
	});

	// act: go to workout page
	await page.goto(`/workouts/${workout.id}`);

	// assert: delete buttons visible
	let deleteBtns = page.getByTestId('deleteExerciseBtn');
	await expect(deleteBtns).toHaveCount(2);

	// act: click delete button
	await page.getByTestId('deleteExerciseBtn').first().click();

	// assert workout exercise deleted
	deleteBtns = page.getByTestId('deleteExerciseBtn');
	await expect(deleteBtns).toHaveCount(1);
});
