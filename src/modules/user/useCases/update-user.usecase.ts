import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, updateUser: UserDto) {
    if (id !== updateUser.id)
      throw new UnauthorizedException(
        'Você não tem permissão para executar esta ação!',
      );

    const user = await this.userRepository.update(id, updateUser);

    return user;
  }
}
