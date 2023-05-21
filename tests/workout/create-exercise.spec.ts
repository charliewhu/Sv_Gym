import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('create exercise from workout page', async ({ page }) => {
	// arrange (add workout exercise to db)
	const workout = await prisma.workout.create({ data: {} });

	// act: go to workout page
	await page.goto(`/workouts/${workout.id}`);

	// act: click create exercise btn
	// assert: on create exercise page
	// act: fill exercise name
	// act: submit
	// assert: back on workout page
	// assert: exercise appears in dropdown
});
