import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('creating an item', async ({ page }) => {
	// variables
	const exerciseNames = ['Exercise 1', 'Exercise 2'];

	// setup
	await prisma.exercise.createMany({
		data: [{ name: exerciseNames[0] }, { name: exerciseNames[1] }]
	});

	// start a workout
	await page.goto('/');
	await page.locator('button[aria-label="startWorkout"]').click();
	await expect(page).toHaveURL('/workouts/1');
	const workouts = await prisma.workout.findMany();
	expect(workouts.length).toEqual(1);

	// assert exercise dropdown is visible
	const exerciseDropdown = page.getByLabel('exerciseDropdown');

	// select-list options should include all exercise items
	const exercises = await prisma.exercise.findMany();
	const dropdownOptions = page.getByTestId('exerciseDropdownItem');
	console.log(dropdownOptions);
	expect(await dropdownOptions.count()).toEqual(exercises.length);

	// add exercise
	await exerciseDropdown.selectOption(exerciseNames[0]);
	await page.locator('button[aria-label="addExercise"]').click();
	await expect(page.getByTestId('exerciseList')).toBeVisible();
	await expect(page.getByTestId('exerciseListItem')).toHaveText(exerciseNames[0]);

	// goto exercises

	// add sets to exercise
});
