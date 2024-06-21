import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class CancelScheduleUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(userId: string, scheduleId: string) {
    const scheduleUser = await this.scheduleRepository.findSchedule(scheduleId);

    if (scheduleUser.userId !== userId) {
      throw new HttpException(
        'Esse horário só pode ser cancelado pelo usuário que agendou',
        HttpStatus.BAD_REQUEST,
      );
    }
    const schedule = await this.scheduleRepository.cancelSchedule(
      userId,
      scheduleId,
    );

    return schedule;
  }
}
