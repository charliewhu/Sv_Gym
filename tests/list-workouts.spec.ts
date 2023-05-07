import { test, expect } from './base.ts';
import { prisma } from '../src/lib/server/prisma.ts';

test('listing workouts', async ({ page }) => {
	// create workouts
	await prisma.workout.create({ data: {} });
	await prisma.workout.create({ data: {} });
	const workouts = await prisma.workout.findMany();

	// go to homepage
	await page.goto('/');

	// assert workouts are shown
	const workoutItems = page.getByTestId('workoutListItem');
	const count = await workoutItems.count();
	expect(count).toEqual(workouts.length);

	// click first workout
	await workoutItems.first().click();

	// assert link to workout exercise list page
	await expect(page).toHaveURL(`workout-exercises?workoutId=${workouts[0].id}`);
});
