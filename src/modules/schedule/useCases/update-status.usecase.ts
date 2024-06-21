import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class UpdateStatusUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(id: string, status: string) {
    const schedule = await this.scheduleRepository.updateStatus(id, status);
    return schedule;
  }
}
