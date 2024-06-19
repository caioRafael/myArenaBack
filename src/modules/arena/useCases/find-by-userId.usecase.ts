import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IArenaRepository } from '../repositories/arena.repository';

@Injectable()
export class FindByUserIdUseCase {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(userId: string) {
    const arena = await this.arenaRepository.findByUser(userId);

    if (!arena)
      throw new HttpException(
        'Não foi encontrado nenhuma arena vinculada a este usuário',
        HttpStatus.BAD_REQUEST,
      );

    return arena;
  }
}
