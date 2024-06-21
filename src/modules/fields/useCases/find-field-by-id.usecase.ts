import { Injectable } from '@nestjs/common';
import { IFieldRepository } from '../reositories/field.reosritory';

@Injectable()
export class FindFieldByIdUseCase {
  constructor(private fieldRepository: IFieldRepository) {}

  async execute(id: string) {
    const field = await this.fieldRepository.findOne(id);

    return field;
  }
}
