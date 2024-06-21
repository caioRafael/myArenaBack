import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class FindByDateUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(date: Date) {
    const scheduleList = await this.scheduleRepository.findByDate(date);

    return scheduleList;
  }
}
