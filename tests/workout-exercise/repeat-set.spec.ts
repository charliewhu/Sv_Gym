import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('Repeat last set', async ({ page }) => {
	// arrange (add sets to db)
	const workout = await prisma.workout.create({ data: {} });
	const exercise = await prisma.exercise.create({ data: { name: 'exercise' } });
	const workoutExercise = await prisma.workoutExercise.create({
		data: { workout: workout.id, exercise: exercise.id }
	});
	await prisma.workoutExerciseSet.createMany({
		data: [{ workoutExercise: workoutExercise.id, weight: 100, reps: 5, rir: 2 }]
	});

	// act: go to sets list page
	await page.goto(`workout-exercises/${workoutExercise.id}`);

	// act: click repeat button
	await page.locator('button', { hasText: 'Repeat Last Set' }).click();

	// assert: 2 sets shown
	const sets = page.getByTestId('setListItem');
	await expect(sets).toHaveCount(2);
});
