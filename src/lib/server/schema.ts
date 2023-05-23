import { z } from 'zod';

export const workoutExerciseSetSchema = z
	.object({
		weight: z.number(),
		reps: z.number(),
		rir: z.number()
	})
	.superRefine((val, ctx) => {
		if (!val.weight && !val.reps && !val.rir) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 2 fields required' });
		}
	});
