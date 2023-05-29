import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('create routine', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';
	const routineName = 'Test Routine Day';

	// arrange (add exercise to db)
	await prisma.exercise.create({ data: { name: exerciseName } });

	// arrange: go to routines page
	await page.goto('/routines');
	await expect(page).toHaveTitle('Routines');

	// act: type name
	await page.getByPlaceholder('Name').fill(routineName);

	// act: click create
	await page.locator('button', { hasText: 'Create' }).click();
	await expect(page).toHaveTitle(routineName);

	// act: add exercise
	const exerciseDropdown = page.getByLabel('exerciseDropdown');
	await exerciseDropdown.selectOption(exerciseName);
	await page.locator('button', { hasText: 'Add' }).click();

	// assert: exercise in list
	await expect(page.getByTestId('exerciseListItem')).toContainText(exerciseName);

	// act: go back to routines page
	await page.goto('/routines');

	// assert: Routine appears in list
	await expect(page.getByText(routineName)).toBeVisible();
});
