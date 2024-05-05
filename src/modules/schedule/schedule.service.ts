import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ScheduleDto from './dto/schedule.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import isHourBetween from 'src/utils/isHourBetween';
import { mutateDate } from 'src/utils/manipulateDateTime';
import verifyConflitDate from 'src/utils/verifyConflitDate';
import findHours from 'src/utils/findHours';
import FieldDto from '../fields/dto/field.dto';
import { IScheduleRepository } from './repositories/schedule.repository';
@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
    private scheduleRepository: IScheduleRepository,
  ) {}
  async create(createScheduleDto: ScheduleDto) {
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

  async FindByField(fieldId: string, date?: Date) {
    const scheduleList = await this.scheduleRepository.findByField(
      fieldId,
      date,
    );

    return scheduleList;
  }

  async FindByArena(arenaId: string, date?: Date, code?: string) {
    const scheduleList = await this.scheduleRepository.findByArena(
      arenaId,
      date,
      code,
    );

    return scheduleList;
  }

  async FindByDate(date: Date) {
    const scheduleList = await this.scheduleRepository.findByDate(date);

    return scheduleList;
  }

  async findAvaliableTimes(fieldId: string, date?: Date) {
    const field = await this.scheduleRepository.findAvaliableTimes(
      fieldId,
      date,
    );

    return findHours(field as FieldDto);
  }

  async report() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // +1 porque os meses em JavaScript vão de 0 a 11
    const anoAtual = dataAtual.getFullYear();

    const report = await this.prisma.scheduleTime.findMany({
      where: {
        AND: [
          {
            date: {
              gte: new Date(`${anoAtual}-${mesAtual}-01`),
              lt: new Date(`${anoAtual}-${mesAtual + 1}-01`),
            },
          },
        ],
      },
    });

    return report;
  }

  async updateStatus(id: string, status: string) {
    const schedule = await this.scheduleRepository.updateStatus(id, status);
    return schedule;
  }

  async findByCode(code: string) {
    const schedule = await this.scheduleRepository.findByCode(code);

    return schedule;
  }

  async cancelSchedule(userId: string, scheduleId: string) {
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
