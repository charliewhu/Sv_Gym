import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('listing exercises', async ({ page }) => {
	// variables
	const exerciseNames = ['Bench Press', 'Exercise 2'];

	// setup
	await prisma.exercise.createMany({
		data: [{ name: exerciseNames[0] }, { name: exerciseNames[1] }]
	});

	const exercises = await prisma.exercise.findMany();

	// go to homepage
	await page.goto('/exercises');

	// assert exercises are shown
	const exerciseItems = page.getByTestId('exerciseListItem');
	const count = await exerciseItems.count();
	expect(count).toEqual(exercises.length);
	await expect(exerciseItems.first()).toContainText(exerciseNames[0]);
	await expect(exerciseItems.last()).toContainText(exerciseNames[1]);
});
