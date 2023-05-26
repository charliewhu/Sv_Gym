import { test, expect } from '../../base.ts';
import { prisma } from '../../../src/lib/server/prisma.ts';
import type { WorkoutExercise } from '@prisma/client';

test.describe('Validate set submission', async () => {
	// variables
	let workoutExercise: WorkoutExercise;
	const errorMsg = 'At least 2 fields required';

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
		await page.locator('button', { hasText: 'Add' }).click();
		await expect(page.getByText(errorMsg)).toBeVisible();
	});

	test('only weight', async ({ page }) => {
		await page.getByPlaceholder('Weight').fill('100');
		await page.locator('button', { hasText: 'Add' }).click();

		// keep form populated
		const weightField = await page.getByPlaceholder('Weight').inputValue();
		expect(weightField).toEqual('100');

		// show error
		await expect(page.getByText(errorMsg)).toBeVisible();
	});

	test('negative values', async ({ page }) => {
		await page.getByPlaceholder('Weight').fill('-1');
		await page.getByPlaceholder('Reps').fill('-1');
		await page.getByPlaceholder('RIR').fill('-1');
		await page.locator('button', { hasText: 'Add' }).click();

		// show error
		await expect(page.getByText('Weight must not be negative')).toBeVisible();
		await expect(page.getByText('Reps must not be negative')).toBeVisible();
		await expect(page.getByText('RIR must not be negative')).toBeVisible();
	});

	test('decimal reps', async ({ page }) => {
		await page.getByPlaceholder('Weight').fill('100');
		await page.getByPlaceholder('Reps').fill('0.5');
		await page.getByPlaceholder('RIR').fill('2');
		await page.locator('button', { hasText: 'Add' }).click();

		// show error
		await expect(page.getByText('Reps must be a whole number')).toBeVisible();
	});

	test.skip('rir >= 5', async ({ page }) => {
		await page.getByPlaceholder('Weight').fill('100');
		await page.getByPlaceholder('Reps').fill('2');
		await page.getByPlaceholder('RIR').fill('6');
		await page.locator('button', { hasText: 'Add' }).click();

		// show error
		await expect(page.getByText('RIR must be between 0 and 4')).toBeVisible();
	});
});
