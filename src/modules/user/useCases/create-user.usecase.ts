import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserDto) {
    const user = await this.userRepository.findUserByEmail(data.email);

    if (user)
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);

    if (
      (data.profile === 'EMPLOYEE' || data.profile === 'ADMINISTRATOR') &&
      (data.arenaId === undefined || data.arenaId === null)
    ) {
      throw new HttpException(
        'Perfil de funcionário precisa estar vinculado a uma emrpesa',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await hash(data.password, 10);

    const userData = {
      ...data,
      password,
    };

    const newUser = await this.userRepository.create(userData);

    return newUser;
  }
}
