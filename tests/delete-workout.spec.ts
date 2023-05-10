import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('deleting workout', async ({ page }) => {
	// arrange (add workout exercise to db)
	await prisma.workout.create({ data: {} });
	await prisma.workout.create({ data: {} });

	// act: go to workouts page
	await page.goto(`/`);

	// assert: delete buttons visible
	let deleteBtns = page.getByTestId('deleteWorkoutBtn');
	await expect(deleteBtns).toHaveCount(2);

	// act: click delete button
	await page.getByTestId('deleteWorkoutBtn').first().click();

	// assert workout exercise deleted
	deleteBtns = page.getByTestId('deleteWorkoutBtn');
	await expect(deleteBtns).toHaveCount(1);
});
