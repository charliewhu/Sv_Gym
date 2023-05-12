import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('navigating workouts', async ({ page }) => {
	// variables
	const setInfo = {
		weight: '100',
		reps: '10',
		rir: '2'
	};

	// Arrange - create full workout
	await prisma.exercise.create({
		data: { name: 'Bench Press' }
	});
	await prisma.workout.create({ data: {} });
	await prisma.workoutExercise.create({ data: {} });

	// start a workout
	await page.goto('/');
	await page.locator('button[aria-label="startWorkout"]').click();
	await expect(page).toHaveURL('/workout-exercises?workoutId=1');
	const workouts = await prisma.workout.findMany();
	expect(workouts.length).toEqual(1);

	// assert exercise dropdown is visible
	const exerciseDropdown = page.getByLabel('exerciseDropdown');

	// assert select-list options contain all exercises
	const exercises = await prisma.exercise.findMany();
	const dropdownOptions = page.getByTestId('exerciseDropdownItem');
	expect(await dropdownOptions.count()).toEqual(exercises.length);

	// add workout exercise
	await expect(page.getByTestId('exerciseList')).not.toBeVisible();
	await exerciseDropdown.selectOption(exerciseNames[0]);
	await page.locator('button[aria-label="addExercise"]').click();
	await expect(page.getByTestId('exerciseList')).toBeVisible();
	const exerciseListItem = page.getByTestId('exerciseListItem');
	await expect(exerciseListItem).toContainText(exerciseNames[0]);

	// goto workout exercise
	await exerciseListItem.click();
	await expect(page).toHaveURL(`/sets?workoutExerciseId=1`);

	// add sets to exercise
	await page.getByPlaceholder('Weight').fill(setInfo.weight);
	await page.getByPlaceholder('Reps').fill(setInfo.reps);
	await page.getByPlaceholder('RIR').fill(setInfo.rir);
	await page.locator('button[aria-label="submitSet"]').click();

	// assert set exists
	const setListItem = page.getByTestId('setListItem');
	await expect(setListItem).toBeVisible();
	await expect(setListItem).toContainText(setInfo.weight);
	await expect(setListItem).toContainText(setInfo.reps);
	await expect(setListItem).toContainText(setInfo.rir);
});
