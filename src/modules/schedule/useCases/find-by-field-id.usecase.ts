import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class FindByFieldIdUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(fieldId: string, date?: Date) {
    const scheduleList = await this.scheduleRepository.findByField(
      fieldId,
      date,
    );

    return scheduleList;
  }
}
