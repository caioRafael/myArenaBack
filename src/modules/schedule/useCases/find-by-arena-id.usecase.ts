import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class FindByArenaIdUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(arenaId: string, date?: Date, code?: string) {
    const scheduleList = await this.scheduleRepository.findByArena(
      arenaId,
      date,
      code,
    );

    return scheduleList;
  }
}
