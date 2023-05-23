import { z } from 'zod';

export const workoutExerciseSetSchema = z
	.object({
		weight: z.number(),
		reps: z.number(),
		rir: z.number()
	})
	.superRefine((val, ctx) => {
		if (Number(!!val.weight) + Number(!!val.reps) + Number(!!val.rir) < 2) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 2 fields required' });
		}
	});
