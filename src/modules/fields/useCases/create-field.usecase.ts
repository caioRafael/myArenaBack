import { Injectable } from '@nestjs/common';
import { IFieldRepository } from '../reositories/field.reosritory';
import FieldDto from '../dto/field.dto';

@Injectable()
export class CreateFieldUseCase {
  constructor(private fieldRepository: IFieldRepository) {}

  async execute(data: FieldDto) {
    const field = await this.fieldRepository.create(data);

    return field;
  }
}
