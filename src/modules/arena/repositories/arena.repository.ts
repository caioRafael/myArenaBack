import ArenaDto, { UserDto } from '../dto/arena.dto';

export abstract class IArenaRepository {
  abstract findUserByEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<UserDto>;
  abstract findArenaByCnpjOrPhoneOrCorporateName(
    cnpj: string,
    phone: string,
    corporateName: string,
  ): Promise<ArenaDto>;
  abstract createArena(arena: ArenaDto): Promise<ArenaDto | null>;
  abstract createAdministrator(user: UserDto): Promise<UserDto | null>;
  abstract findAll(): Promise<ArenaDto[]>;
  abstract findByUser(userId: string): Promise<ArenaDto>;
  abstract findOne(id: string): Promise<ArenaDto>;
  abstract monthReport(id: string): Promise<any>;
}
