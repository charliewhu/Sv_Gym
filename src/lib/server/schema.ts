import { z } from 'zod';

export const workoutExerciseSetSchema = z
	.object({
		weight: z.number().gte(0, { message: 'Weight must not be negative' }),
		reps: z.number().gt(0, { message: 'Reps must not be negative' }),
		rir: z.number().gte(0, { message: 'RIR must not be negative' })
	})
	.superRefine((val, ctx) => {
		if (Number(!!val.weight) + Number(!!val.reps) + Number(!!val.rir) < 2) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 2 fields required' });
		}
	});
