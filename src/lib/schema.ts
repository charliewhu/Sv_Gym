import { z } from 'zod';

export const workoutExerciseSetSchema = z
	.object({
		weight: z.number().nonnegative({ message: 'Weight must not be negative' }).optional(),
		reps: z
			.number()
			.nonnegative({ message: 'Reps must not be negative' })
			.int({ message: 'Reps must be a whole number' })
			.optional(),
		rir: z.number().nonnegative({ message: 'RIR must not be negative' }).optional()
	})
	.superRefine((val, ctx) => {
		if (Number(!!val.weight) + Number(!!val.reps) + Number(!!val.rir) < 2) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 2 fields required' });
		}
	});

export type WorkoutExerciseSetSchema = typeof workoutExerciseSetSchema;
