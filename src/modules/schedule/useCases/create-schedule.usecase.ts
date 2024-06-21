import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ScheduleDto from '../dto/schedule.dto';
import isHourBetween from 'src/utils/isHourBetween';
import { mutateDate } from 'src/utils/manipulateDateTime';
import verifyConflitDate from 'src/utils/verifyConflitDate';
import { IScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class CreateScheduleUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(createScheduleDto: ScheduleDto) {
    const scheduleDate = mutateDate(new Date(createScheduleDto.date));

    const field = await this.scheduleRepository.findField(
      createScheduleDto.fieldId,
      scheduleDate,
    );

    if (!field)
      throw new HttpException('Quadra não encontrada', HttpStatus.BAD_REQUEST);

    const validateHours =
      isHourBetween(field.openIn, field.closeIn, createScheduleDto.hour) &&
      isHourBetween(
        field.openIn,
        field.closeIn,
        createScheduleDto.hour + createScheduleDto.amountHours,
      );

    const validateCompatibilityHour = verifyConflitDate(
      field.ScheduleTime as ScheduleDto[],
      {
        hour: createScheduleDto.hour,
        endHour: createScheduleDto.hour + createScheduleDto.amountHours,
      },
    );
    if (!validateCompatibilityHour && validateHours) {
      const data = {
        userId: createScheduleDto.userId,
        amountHours: createScheduleDto.amountHours,
        date: scheduleDate,
        hour: createScheduleDto.hour,
        fieldId: createScheduleDto.fieldId,
        sport: createScheduleDto.sport,
        endHour: createScheduleDto.hour + createScheduleDto.amountHours,
        price: field.price * createScheduleDto.amountHours,
        status: 'DOWN_PAYMENT',
        code: Math.floor(Date.now() * Math.random()).toString(16),
      };
      const squedule = await this.scheduleRepository.create(data);

      return squedule;
    } else {
      throw new HttpException(
        'Esse horário esta indisponivel',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
