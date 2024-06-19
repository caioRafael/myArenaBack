import { Injectable } from '@nestjs/common';
import { IArenaRepository } from '../repositories/arena.repository';

@Injectable()
export class ListAllUseCase {
  constructor(private arenaReository: IArenaRepository) {}

  async execute() {
    const arenaList = await this.arenaReository.findAll();

    return arenaList;
  }
}
