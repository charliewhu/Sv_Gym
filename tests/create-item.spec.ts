import { expect, test } from '@playwright/test';
import { prisma } from '../src/lib/server/prisma.ts';

test('creating an item', async ({ page }) => {
	// variables
	const exerciseName = 'Exercise 1';

	// setup
	await prisma.exercise.create({
		data: {
			name: exerciseName
		}
	});

	// start a workout
	await page.goto('/');
	await page.locator('button[aria-label="startWorkout"]').click();
	await expect(page).toHaveURL('/workouts/1');
	const workouts = await prisma.workouts.findMany();
	await expect(workouts.length).toEqual(1);

	// add exercises
	const exerciseDropdown = await page.getByRole('listitem');
	exerciseDropdown.getByText(exerciseName);
	await page.locator('button[aria-label="addExercise"]').click();
	await expect(page.getByTestId('exerciseList')).toBeVisible();
	await expect(page.getByTestId('exerciseListItem')).toHaveText(exerciseName);

	// goto exercises

	// add sets to exercise
});
