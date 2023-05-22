import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('create exercise from workout page', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';

	// arrange (add workout exercise to db)
	const workout = await prisma.workout.create({ data: {} });

	// act: go to workout page
	await page.goto(`/workouts/${workout.id}`);

	// act: click create exercise btn
	await page.locator('button', { hasText: 'Create New Exercise' }).click();

	// assert: on create exercise page
	await expect(page).toHaveTitle('Create Exercise');

	// act: fill exercise name
	await page.getByPlaceholder('Name').fill(exerciseName);
	await page.locator('button[aria-label="submitNewExercise"]').click();

	// assert: back on workout page
	await expect(page).toHaveTitle(`Workout ${workout.id}`);

	// assert: exercise appears in dropdown
	const dropdownOptions = page.getByTestId('exerciseDropdownItem');
	await expect(dropdownOptions).toContainText(exerciseName);
});
