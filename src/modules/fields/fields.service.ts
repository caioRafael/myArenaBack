import { Injectable } from '@nestjs/common';
import FieldDto from './dto/field.dto';
import { IFieldRepository } from './reositories/field.reosritory';

@Injectable()
export class FieldsService {
  constructor(private fieldReository: IFieldRepository) {}
  async create(createFieldDto: FieldDto) {
    const field = await this.fieldReository.create(createFieldDto);

    return field;
  }

  async findAll(arenaId: string) {
    const fields = await this.fieldReository.findAllByArena(arenaId);
    return fields;
  }

  async findOne(id: string) {
    const field = await this.fieldReository.findOne(id);

    return field;
  }
}
