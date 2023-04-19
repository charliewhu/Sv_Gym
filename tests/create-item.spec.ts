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

	// add exercises
	const exerciseDropdown = page.locator('select');
	await expect(exerciseDropdown).toBeVisible();

	// select list options should include all exercise items
	const exercises = await prisma.exercise.findMany();
	const innerDropdown = await exerciseDropdown.allTextContents();
	expect(innerDropdown.length).toEqual(exercises.length);
	await exerciseDropdown.selectOption(exerciseNames[0]);

	await page.locator('button[aria-label="addExercise"]').click();
	await expect(page.getByTestId('exerciseList')).toBeVisible();
	await expect(page.getByTestId('exerciseListItem')).toHaveText(exerciseNames[0]);

	// goto exercises

	// add sets to exercise
});
