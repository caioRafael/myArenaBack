import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateScheduleSchema = z.object({
  date: z.date({
    required_error: 'date is required',
  }),
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
});

export class CreateScheduleSchemaDTO extends createZodDto(
  CreateScheduleSchema,
) {}
