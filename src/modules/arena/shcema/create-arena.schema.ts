import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateUserSquema = z.object({
  name: z.string().min(1, 'administrator name is required'),
  nickname: z.string().min(1, 'nickname is required'),
  phone: z.string().min(1, 'phone is required'),
  email: z.string().min(1, 'administrator email is required'),
  password: z.string().min(1, 'password is required'),
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
  cep: z.string().min(1, 'CEP is required'),
  city: z.string().min(2, 'City is required'),
  uf: z.string().min(2, 'UF is required'),
  locale: z.string().min(1, 'Locale is required'),
});

export class CreateArenaSchemaDTO extends createZodDto(CreateArenaSquema) {}

export const CreateArenaResponseDTO = CreateArenaSquema.omit({});

export type CreateArenaResponseDTO = z.infer<typeof CreateArenaResponseDTO>;
