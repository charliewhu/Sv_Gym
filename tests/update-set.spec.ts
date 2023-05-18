import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('update set', async ({ page }) => {
	// arrange (add set to db)
	const workout = await prisma.workout.create({ data: {} });
	const exercise = await prisma.exercise.create({ data: { name: 'exercise' } });
	const workoutExercise = await prisma.workoutExercise.create({
		data: { workout: workout.id, exercise: exercise.id }
	});
	const set = await prisma.workoutExerciseSet.create({
		data: { workoutExercise: workoutExercise.id, weight: 100, reps: 5, rir: 2 }
	});

	// act: go to sets list page
	await page.goto(`workout-exercises/${workoutExercise.id}`);

	// assert: set edit button visible
	const editBtns = page.getByTestId('updateSetBtn');
	await expect(editBtns).toHaveCount(1);

	// act: click edit button
	await page.getByTestId('updateSetBtn').first().click();

	// assert: form filled with set data
	await expect(await page.getByPlaceholder('Weight').inputValue()).toEqual(String(set.weight));
	await expect(await page.getByPlaceholder('Reps').inputValue()).toEqual(String(set.reps));
	await expect(await page.getByPlaceholder('RIR').inputValue()).toEqual(String(set.rir));

	// act: change form values
	await page.getByPlaceholder('Weight').clear();
	await page.getByPlaceholder('Weight').fill('110');

	// act: submit form
	await page.getByText('Update').click();

	// assert: listItem has changed value
	const setListItem = page.getByTestId('setListItem');
	await expect(setListItem).toBeVisible();
	await expect(setListItem).toContainText(String(set.weight));
});
