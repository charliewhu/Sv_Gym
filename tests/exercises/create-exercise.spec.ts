import { test, expect } from '../base.ts';

test('creating exercises', async ({ page }) => {
	// variables
	const exerciseName = 'Bench Press';

	// go to exercises page
	await page.goto('/exercises');
	await expect(page).toHaveTitle('Exercises');

	// assert no exercises exist
	const exerciseListItems = await page.getByTestId('exerciseListItem');
	const exercisesCount = await exerciseListItems.count();
	await expect(exercisesCount).toEqual(0);

	// click add exercises
	await page.locator('a[aria-label="createExercise"]').click();
	await expect(page).toHaveTitle('Create Exercise');

	// type exercise name
	await page.getByPlaceholder('Name').fill(exerciseName);

	// submit form
	await page.locator('button[aria-label="submitNewExercise"]').click();

	// assert exercise is now in the list
	const exerciseItem = await page.getByTestId('exerciseListItem');
	await expect(exerciseItem).toHaveText(exerciseName);
});
