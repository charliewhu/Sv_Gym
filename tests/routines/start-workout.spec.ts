import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('start Workout from Routine', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';
	const routineName = 'Test Routine Day';

	// arrange: db
	const exercise = await prisma.exercise.create({ data: { name: exerciseName } });
	const routine = await prisma.routine.create({ data: { name: routineName } });
	await prisma.routineExercise.create({ data: { routine: routine.id, exercise: exercise.id } });

	// arrange: go to routines page
	await page.goto('/routines');

	// act: click routine workout button
	await page.getByTestId('startWorkoutBtn').click();

	// assert: on workout page
	await expect(await page.title()).toContain('Workout');

	// assert: exercise from routine is in the list
	await expect(page.getByText(exerciseName)).toBeVisible();
});
