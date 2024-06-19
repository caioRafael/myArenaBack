import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateScheduleSchema = z.object({
  date: z
    .string({
      required_error: 'date is required',
    })
    .transform((item) => new Date(item)),
  hour: z.number({
    required_error: 'hour is required',
  }),
  amountHours: z.number({
    required_error: 'amount hour is required',
  }),
  sport: z.string({
    required_error: 'sport is required',
  }),
  fieldId: z.string({
    required_error: 'select a field',
  }),
  userId: z.string({
    required_error: 'user is required',
  }),
});

export const QueryParam = z.object({
  date: z.string(),
  code: z.string().optional(),
});

export class CreateScheduleSchemaDTO extends createZodDto(
  CreateScheduleSchema,
) {}
