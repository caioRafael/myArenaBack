import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateFieldSquema = z.object({
  name: z.string({
    required_error: 'field name is required',
  }),
  price: z.number({
    required_error: 'price is required',
  }),
  openIn: z
    .number({
      required_error: 'openIn is required',
    })
    .min(0, 'enter a valid time'),
  closeIn: z
    .number({
      required_error: 'closeIn is required',
    })
    .max(24, 'enter a valid time'),
  sports: z.string({
    required_error: 'inform the sports',
  }),
  arenaId: z.string({
    required_error: 'arena is required',
  }),
});

export class CreateFieldSquemaDTO extends createZodDto(CreateFieldSquema) {}
