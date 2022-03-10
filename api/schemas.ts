import { number, object, SchemaOf, string } from 'yup';
import { Log, LogCreate } from './models';

export const timestampSchema = object({
  seconds: number().min(0),
  nanoseconds: number().min(0),
});

export const logSchema: SchemaOf<Log> = object({
  event: string().required().min(3),
  description: string().optional(),
  time: timestampSchema.required(),
});

export const logCreateSchema: SchemaOf<LogCreate> = object({
  event: string().required().min(3),
  description: string().nullable(),
});
