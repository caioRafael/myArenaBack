import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { ScheduleGateway } from './schedule.gateway';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService, ScheduleGateway],
})
export class ScheduleModule {}
