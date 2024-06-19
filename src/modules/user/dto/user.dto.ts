import Entity from 'src/types/Entity';

export interface UserDto extends Entity {
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  arenaId?: string;
  profile: 'ADMINISTRATOR' | 'EMPLOYEE' | 'CLIENT' | string;
}

export interface FileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
