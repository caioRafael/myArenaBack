import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { ScheduleGateway } from './schedule.gateway';
import { IScheduleRepository } from './repositories/schedule.repository';
import SchedulePrismaRepository from './repositories/prisma/Schedule.prisma.repository';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    PrismaService,
    ScheduleGateway,
    {
      provide: IScheduleRepository,
      useClass: SchedulePrismaRepository,
    },
  ],
})
export class ScheduleModule {}
