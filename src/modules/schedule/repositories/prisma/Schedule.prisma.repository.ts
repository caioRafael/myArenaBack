import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../schedule.repository';
import ScheduleDto from '../../dto/schedule.dto';
import { PrismaService } from 'src/infra/database/prisma.service';
import FieldDto from 'src/modules/fields/dto/field.dto';

@Injectable()
export default class SchedulePrismaRepository implements IScheduleRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ScheduleDto): Promise<ScheduleDto> {
    const squedule = await this.prisma.scheduleTime.create({
      data: {
        userId: data.userId,
        amountHours: data.amountHours,
        date: data.date,
        hour: data.hour,
        fieldId: data.fieldId,
        sport: data.sport,
        endHour: data.hour + data.amountHours,
        price: data.price,
        status: 'DOWN_PAYMENT',
        code: data.c,
      },
    });

    return squedule;
  }

  async findField(fieldId: string, date: Date): Promise<FieldDto | null> {
    const field = await this.prisma.fields.findUnique({
      where: {
        id: fieldId,
      },
      include: {
        ScheduleTime: {
          where: {
            date: date,
          },
        },
        arena: true,
      },
    });

    return field as FieldDto;
  }

  async findByArena(
    arenaId: string,
    date?: Date,
    code?: string,
  ): Promise<ScheduleDto[]> {
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

  async findByDate(date: Date): Promise<ScheduleDto[]> {
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

  async findByField(fieldId: string, date?: Date): Promise<ScheduleDto[]> {
    const scheduleList = await this.prisma.scheduleTime.findMany({
      where: {
        AND: [{ fieldId: fieldId }, { date: date }],
      },
    });

    return scheduleList;
  }

  async cancelSchedule(
    userId: string,
    scheduleId: string,
  ): Promise<ScheduleDto> {
    const schedule = await this.prisma.scheduleTime.update({
      where: {
        id: scheduleId,
        userId: userId,
      },
      data: {
        status: 'CANCEL',
      },
    });

    return schedule;
  }

  async findAvaliableTimes(fieldId: string, date?: Date): Promise<FieldDto> {
    const consultDate = `${date.getFullYear()}-${
      date.getMonth() < 9 ? '0' : ''
    }${date.getMonth() + 1}-${date.getDate()}`;

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

    return field as FieldDto;
  }

  async findByCode(code: string): Promise<ScheduleDto> {
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

  async updateStatus(id: string, status: string): Promise<ScheduleDto> {
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

  async findSchedule(id: string): Promise<ScheduleDto> {
    const scheduleUser = await this.prisma.scheduleTime.findUnique({
      where: {
        id: id,
      },
    });

    return scheduleUser;
  }
}
