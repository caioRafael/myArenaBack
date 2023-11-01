import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ScheduleDto from './dto/schedule.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import isHourBetween from 'src/utils/isHourBetween';
@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}
  async create(createScheduleDto: ScheduleDto) {
    const field = await this.prisma.fields.findUnique({
      where: {
        id: createScheduleDto.fieldId,
      },
    });

    if (!field)
      throw new HttpException('Quadra não encontrada', HttpStatus.BAD_REQUEST);

    const endHour = new Date(createScheduleDto.hour);
    endHour.setHours(endHour.getHours() + createScheduleDto.amountHours);

    const validateHours =
      isHourBetween(
        field.openIn,
        field.closeIn,
        new Date(createScheduleDto.hour),
      ) && isHourBetween(field.openIn, field.closeIn, new Date(endHour));

    const scheduleDate = new Date(createScheduleDto.date);
    scheduleDate.setHours(-3, 0, 0, 0);

    if (validateHours) {
      const squedule = await this.prisma.scheduleTime.create({
        data: {
          clientName: createScheduleDto.clientName,
          clientPhone: createScheduleDto.clientPhone,
          amountHours: createScheduleDto.amountHours,
          date: scheduleDate,
          hour: createScheduleDto.hour,
          fieldId: createScheduleDto.fieldId,
          sport: createScheduleDto.sport,
          endHour: endHour,
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

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: ScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
