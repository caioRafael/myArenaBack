import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string({
    required_error: 'name is required',
  }),
  nickname: z.string({
    required_error: 'nickname is required',
  }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({
      message: 'invalid email',
    }),
  phone: z.string({
    required_error: 'phone is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
  avatar: z.string().optional(),
  arenaId: z.string().optional(),
  profile: z.enum(['ADMINISTRATOR', 'EMPLOYEE', 'CLIENT']),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}
