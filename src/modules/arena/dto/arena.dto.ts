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

export default interface ArenaDto extends Entity {
  fantasyName: string;
  corporateName?: string;
  cnpj?: string;
  phone: string;
  logo?: string;
  address: string;
  employees: UserDto[];
  createdAt?: Date;
  pixKey?: string;
  requirePrePayment: boolean;
  cep: string;
  city: string;
  uf: string;
  locale: string;
  //administrador usado so na criação
  administrator?: UserDto;
}
