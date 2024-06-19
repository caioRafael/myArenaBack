import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'invalid email' }),
  password: z.string({
    required_error: 'password is required',
  }),
});

export class LoginSchemaDTO extends createZodDto(LoginSchema) {}
