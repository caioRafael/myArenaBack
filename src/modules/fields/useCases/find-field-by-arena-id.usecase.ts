import { Injectable } from '@nestjs/common';
import { IFieldRepository } from '../reositories/field.reosritory';

@Injectable()
export class FindFieldByArenaId {
  constructor(private fieldRepository: IFieldRepository) {}

  async execute(arenaId: string) {
    const fields = await this.fieldRepository.findAllByArena(arenaId);
    return fields;
  }
}
