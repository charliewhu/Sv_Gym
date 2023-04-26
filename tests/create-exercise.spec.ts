import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('creating exercises', async ({ page }) => {
	// variables
	const exerciseName = 'Bench Press';

	// go to exercises page
	await page.goto('/exercises');

	// assert no exercises exist
	const exerciseListItems = await page.getByTestId('exerciseListItem');
	const exercisesCount = await exerciseListItems.count();
	await expect(exercisesCount).toEqual(0);

	// click add exercises

	// type exercise name

	// submit form

	// assert exercise is now in the list
});
