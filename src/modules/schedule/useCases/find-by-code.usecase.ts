import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class FindByCodeUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(code: string) {
    const schedule = await this.scheduleRepository.findByCode(code);

    return schedule;
  }
}
