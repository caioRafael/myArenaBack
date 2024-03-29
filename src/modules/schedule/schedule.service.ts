import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ScheduleDto from './dto/schedule.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import isHourBetween from 'src/utils/isHourBetween';
import { mutateDate } from 'src/utils/manipulateDateTime';
import verifyConflitDate from 'src/utils/verifyConflitDate';
import findHours from 'src/utils/findHours';
import FieldDto from '../fields/dto/field.dto';
// import findTimes from 'src/utils/findTimes';
@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}
  async create(createScheduleDto: ScheduleDto) {
    const scheduleDate = mutateDate(new Date(createScheduleDto.date));

    const field = await this.prisma.fields.findUnique({
      where: {
        id: createScheduleDto.fieldId,
      },
      include: {
        ScheduleTime: {
          where: {
            date: scheduleDate,
          },
        },
        arena: true,
      },
    });

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
      const squedule = await this.prisma.scheduleTime.create({
        data: {
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
        },
      });

      return squedule;
    } else {
      throw new HttpException(
        'Esse horário esta indisponivel',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async FindByField(fieldId: string, date?: Date) {
    const scheduleList = await this.prisma.scheduleTime.findMany({
      where: {
        AND: [{ fieldId: fieldId }, { date: date }],
      },
    });

    return scheduleList;
  }

  async FindByArena(arenaId: string, date?: Date, code?: string) {
    const data = {
      date,
      code,
    };
    const scheduleList = await this.prisma.scheduleTime.findMany({
      where: {
        AND: [data, { field: { arenaId: arenaId } }],
      },
      include: {
        field: true,
        user: true,
      },
      orderBy: {
        hour: 'asc',
      },
    });

    return scheduleList;
  }

  async FindByDate(date: Date) {
    const scheduleList = await this.prisma.scheduleTime.findMany({
      where: {
        date,
      },
      include: {
        field: true,
      },
      orderBy: {
        hour: 'asc',
      },
    });

    return scheduleList;
  }

  async findAvaliableTimes(fieldId: string, date?: Date) {
    const consultDate = `${date.getFullYear()}-${
      date.getMonth() < 9 ? '0' : ''
    }${date.getMonth() + 1}-${date.getDate()}`;

    console.log('service', new Date(consultDate));
    const field = await this.prisma.fields.findUnique({
      where: {
        id: fieldId,
      },
      include: {
        ScheduleTime: {
          where: {
            date: new Date(consultDate),
          },
        },
      },
    });

    console.log(field);

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
    const schedule = await this.prisma.scheduleTime.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return schedule;
  }

  async findByCode(code: string) {
    const schedule = await this.prisma.scheduleTime.findUnique({
      where: {
        code,
      },
      include: {
        user: true,
        field: true,
      },
    });

    return schedule;
  }
}
