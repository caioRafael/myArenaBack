import { Injectable } from '@nestjs/common';
import findHours from 'src/utils/findHours';
import FieldDto from '../../fields/dto/field.dto';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class FindAvaliableTimesUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(fieldId: string, date?: Date) {
    const field = await this.scheduleRepository.findAvaliableTimes(
      fieldId,
      date,
    );

    return findHours(field as FieldDto);
  }
}
