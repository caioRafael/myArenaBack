import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ArenaDto, { UserDto } from './dto/arena.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import { hash } from 'bcrypt';
import { IArenaRepository } from './repositories/arena.repository';

@Injectable()
export class ArenaService {
  constructor(private arenaReository: IArenaRepository) {}
  async create(createArenaDto: ArenaDto) {
    const user = await this.arenaReository.findUserByEmailOrPhone(
      createArenaDto.administrator.email,
      createArenaDto.administrator.phone,
    );

    if (user && user.email === createArenaDto.administrator.email)
      throw new HttpException(
        'Esse e-mail ja está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (user && user.phone === createArenaDto.administrator.phone)
      throw new HttpException(
        'Já existe um usuário com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const arena =
      await this.arenaReository.findArenaByCnpjOrPhoneOrCorporateName(
        createArenaDto.cnpj,
        createArenaDto.phone,
        createArenaDto.corporateName,
      );

    if (arena && arena.cnpj === createArenaDto.cnpj)
      throw new HttpException(
        'Esse CNPJ já está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.corporateName === createArenaDto.corporateName)
      throw new HttpException(
        'Essa razão social já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.phone === createArenaDto.phone)
      throw new HttpException(
        'Já existe uma arena com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const password = await hash(createArenaDto.administrator.password, 10);

    const arenaData = {
      address: createArenaDto.address,
      fantasyName: createArenaDto.fantasyName,
      phone: createArenaDto.phone,
      corporateName: createArenaDto.corporateName,
      cnpj: createArenaDto?.cnpj,
      pixKey: createArenaDto?.pixKey,
      requirePrePayment: createArenaDto.requirePrePayment,
      cep: createArenaDto.cep,
      city: createArenaDto.city,
      locale: createArenaDto.locale,
      uf: createArenaDto.uf,
    };
    const newArena = await this.arenaReository.createArena(
      arenaData as ArenaDto,
    );

    const administratorData = {
      email: createArenaDto.administrator.email,
      name: createArenaDto.administrator.name,
      nickname: createArenaDto.administrator.nickname,
      password: password,
      profile: 'ADMINISTRATOR',
      arenaId: newArena.id,
      phone: createArenaDto.administrator.phone,
    };

    const newUser = await this.arenaReository.createAdministrator(
      administratorData as UserDto,
    );

    if (newArena && newUser) return newArena;
  }

  async findAll() {
    const arenaList = await this.arenaReository.findAll();

    return arenaList;
  }

  async findByUser(userId: string) {
    const arena = await this.arenaReository.findByUser(userId);

    return arena;
  }

  async findOne(id: string) {
    const arena = await this.arenaReository.findOne(id);

    return arena;
  }

  async monthReport(id: string) {
    const arenaReport = await this.arenaReository.monthReport(id);

    return arenaReport;
  }
}
