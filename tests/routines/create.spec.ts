import { test, expect } from '../base.ts';
import { prisma } from '../../src/lib/server/prisma.ts';

test('create routine', async ({ page }) => {
	// arrange: variables
	const exerciseName = 'Test Exercise';
	const routineName = 'Test Routine Day';

	// arrange (add exercise to db)
	const exercise = await prisma.exercise.create({ data: { name: exerciseName } });

	// arrange: go to routines page

	// act: click create
	// act: type name
	// act: add exercise
	// act: click submit
	// assert: Redirected to routines page
	// assert: Routine appears in list
});
