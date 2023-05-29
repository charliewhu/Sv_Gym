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
	// act: click routine workout button
	// assert: on workout page
	// assert: exercise from routine is in the list
});
