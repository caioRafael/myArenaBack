import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IArenaRepository } from '../repositories/arena.repository';
import ArenaDto, { UserDto } from '../dto/arena.dto';
import { IUserRepository } from 'src/modules/user/repositories/user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class CreateArenaUseCase {
  constructor(
    private arenaRepository: IArenaRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: ArenaDto) {
    const user = await this.userRepository.findUserByEmailOrPhone(
      data.administrator.email,
      data.administrator.phone,
    );

    if (user && user.email === data.administrator.email)
      throw new HttpException(
        'Esse e-mail ja está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (user && user.phone === data.administrator.phone)
      throw new HttpException(
        'Já existe um usuário com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const arena =
      await this.arenaRepository.findArenaByCnpjOrPhoneOrCorporateName(
        data.cnpj,
        data.phone,
        data.corporateName,
      );

    if (arena && arena.cnpj === data.cnpj)
      throw new HttpException(
        'Esse CNPJ já está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.corporateName === data.corporateName)
      throw new HttpException(
        'Essa razão social já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.phone === data.phone)
      throw new HttpException(
        'Já existe uma arena com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const password = await hash(data.administrator.password, 10);

    const arenaData = {
      address: data.address,
      fantasyName: data.fantasyName,
      phone: data.phone,
      corporateName: data.corporateName,
      cnpj: data?.cnpj,
      pixKey: data?.pixKey,
      requirePrePayment: data.requirePrePayment,
      cep: data.cep,
      city: data.city,
      locale: data.locale,
      uf: data.uf,
    };
    const newArena = await this.arenaRepository.createArena(
      arenaData as ArenaDto,
    );

    const administratorData = {
      email: data.administrator.email,
      name: data.administrator.name,
      nickname: data.administrator.nickname,
      password: password,
      profile: 'ADMINISTRATOR',
      arenaId: newArena.id,
      phone: data.administrator.phone,
    };

    const newUser = await this.userRepository.create(
      administratorData as UserDto,
    );

    if (newArena && newUser) return newArena;
  }
}
