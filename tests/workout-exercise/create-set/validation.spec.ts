import { test, expect } from '../../base.ts';
import { prisma } from '../../../src/lib/server/prisma.ts';
import type { WorkoutExercise } from '@prisma/client';

test.describe('Validate set submission', async () => {
	// variables
	let workoutExercise: WorkoutExercise;

	test.beforeEach(async ({ page }) => {
		// arrange: create WorkoutExercise
		const workout = await prisma.workout.create({ data: {} });
		const exercise = await prisma.exercise.create({ data: { name: 'exercise' } });
		workoutExercise = await prisma.workoutExercise.create({
			data: { workout: workout.id, exercise: exercise.id }
		});
		await page.goto(`workout-exercises/${workoutExercise.id}`);
	});

	test('at least 2 fields filled', async ({ page }) => {
		const errorMsg = 'At least 2 fields required';
		const submitButton = page.locator('button', { hasText: 'Add' });

		// blank fields
		await submitButton.click();
		await expect(page.getByText(errorMsg)).toBeVisible();

		// just weight
		await page.getByPlaceholder('Weight').fill('100');
		await submitButton.click();
		await expect(page.getByText(errorMsg)).toBeVisible();

		// just reps
	});

	test.skip('negative values', async ({ page }) => {
		await expect(1).toEqual(1);
	});

	test.skip('decimal reps/rir', async ({ page }) => {
		await expect(1).toEqual(1);
	});

	test.skip('rir >= 5', async ({ page }) => {
		await expect(1).toEqual(1);
	});
});
