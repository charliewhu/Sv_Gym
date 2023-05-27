import { z } from 'zod';

export const workoutExerciseSetSchema = z
	.object({
		weight: z.number().nonnegative({ message: 'Weight must be positive' }).nullable(),
		reps: z
			.number()
			.nonnegative({ message: 'Reps must be positive' })
			.int({ message: 'Reps must be a whole number' })
			.max(4, { message: 'Reps must be less than 50' })
			.nullable(),
		rir: z
			.number()
			.nonnegative({ message: 'RIR must be positive' })
			.max(4, { message: 'RIR must be between 0 and 4' })
			.nullable()
	})
	.superRefine((val, ctx) => {
		if (Number(!!val.weight) + Number(!!val.reps) + Number(!!val.rir) < 2) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 2 fields required' });
		}
	});

export type WorkoutExerciseSetSchema = typeof workoutExerciseSetSchema;
