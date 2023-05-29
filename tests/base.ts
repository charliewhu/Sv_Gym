import { test as base } from '@playwright/test';
import { prisma } from '../src/lib/server/prisma.ts';

export const test = base.extend({
	page: async ({ page }, use) => {
		// enable console log outputs to be visible
		page.on('console', (msg) => {
			console.log(msg);
		});

		// clear all existing records
		await prisma.workoutExerciseSet.deleteMany();
		await prisma.workoutExercise.deleteMany();
		await prisma.workout.deleteMany();
		await prisma.routineExercise.deleteMany();
		await prisma.routine.deleteMany();
		await prisma.exercise.deleteMany();
		console.log('Old items cleared from db');

		console.log('Test Suite running...');

		await use(page);
	}
});

export { expect } from '@playwright/test';
