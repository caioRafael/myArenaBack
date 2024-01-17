import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateUserSquema = z.object({
  name: z.string({
    required_error: 'administrator name is required',
  }),
  nickname: z.string({
    required_error: 'nickname is required',
  }),
  phone: z.string({
    required_error: 'phone is required',
  }),
  email: z
    .string({
      required_error: 'administrator email is required',
    })
    .email({
      message: 'invalid email',
    }),
  password: z.string({
    required_error: 'password is required',
  }),
});

export const CreateArenaSquema = z.object({
  administrator: CreateUserSquema,
  fantasyName: z.string({
    required_error: 'fantasy name is required',
  }),
  corporateName: z.string(),
  cnpj: z.string(),
  phone: z.string({
    required_error: 'phone is required',
  }),
  address: z.string(),
  pixKey: z.string(),
  requirePrePayment: z.boolean(),
});

export class CreateArenaSchemaDTO extends createZodDto(CreateArenaSquema) {}

export const CreateArenaResponseDTO = CreateArenaSquema.omit({});

export type CreateArenaResponseDTO = z.infer<typeof CreateArenaResponseDTO>;
