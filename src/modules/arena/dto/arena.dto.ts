import Entity from 'src/types/Entity';

export interface UserDto extends Entity {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export default interface ArenaDto extends Entity {
  fantasyName: string;
  corporateName?: string;
  cnpj?: string;
  phone: string;
  address: string;
  administratorId?: string;
  administrator: UserDto;
}
