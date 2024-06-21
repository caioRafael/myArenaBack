import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { ScheduleGateway } from './schedule.gateway';
import { IScheduleRepository } from './repositories/schedule.repository';
import SchedulePrismaRepository from './repositories/prisma/Schedule.prisma.repository';
import { CreateScheduleUseCase } from './useCases/create-schedule.usecase';
import { FindByFieldIdUseCase } from './useCases/find-by-field-id.usecase';
import { FindByArenaIdUseCase } from './useCases/find-by-arena-id.usecase';
import { FindByDateUseCase } from './useCases/find-by-date.usecase';
import { FindAvaliableTimesUseCase } from './useCases/find-avaliables-time.usecase';
import { ReportUseCase } from './useCases/report.usecase';
import { UpdateStatusUseCase } from './useCases/update-status.usecase';
import { FindByCodeUseCase } from './useCases/find-by-code.usecase';
import { CancelScheduleUseCase } from './useCases/cancel-schedule.usecase';

@Module({
  controllers: [ScheduleController],
  providers: [
    PrismaService,
    ScheduleGateway,
    CreateScheduleUseCase,
    FindByFieldIdUseCase,
    FindByArenaIdUseCase,
    FindByDateUseCase,
    FindAvaliableTimesUseCase,
    ReportUseCase,
    UpdateStatusUseCase,
    FindByCodeUseCase,
    CancelScheduleUseCase,
    {
      provide: IScheduleRepository,
      useClass: SchedulePrismaRepository,
    },
  ],
})
export class ScheduleModule {}
