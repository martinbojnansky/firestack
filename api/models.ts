import z from 'zod';

export const timestampSchema = z.strictObject({
  seconds: z.number(),
  nanoseconds: z.number(),
});

export type Timestamp = z.infer<typeof timestampSchema>;

export const logSchema = z.strictObject({
  event: z.string().min(3),
  description: z.string().nullable(),
  time: timestampSchema,
});

export type Log = z.infer<typeof logSchema>;

export const logCreateSchema = logSchema.pick({
  event: true,
  description: true,
});

export type LogCreate = z.infer<typeof logCreateSchema>;
