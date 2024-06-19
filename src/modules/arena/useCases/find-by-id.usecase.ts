import { Injectable } from '@nestjs/common';
import { IArenaRepository } from '../repositories/arena.repository';

@Injectable()
export class FindByIdUseCase {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(id: string) {
    const arena = await this.arenaRepository.findOne(id);

    return arena;
  }
}
