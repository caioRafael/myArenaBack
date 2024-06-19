import { Module } from '@nestjs/common';
import { ArenaController } from './arena.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { IArenaRepository } from './repositories/arena.repository';
import ArenaPrismaRepository from './repositories/prisma/arena.prisma.repository';
import { IUserRepository } from '../user/repositories/user.repository';
import UserPrismaRepository from '../user/repositories/prisma/user.prisma.repository';
import { CreateArenaUseCase } from './useCases/create-arena.usecase';
import { MonthReportUseCase } from './useCases/month-report.usecase';
import { IStorage } from 'src/infra/providers/storage/storage';
import AwsStorage from 'src/infra/providers/storage/aws.storage';
import { ListAllUseCase } from './useCases/list-all.usecase';
import { FindByIdUseCase } from './useCases/find-by-id.usecase';
import { FindByUserIdUseCase } from './useCases/find-by-userId.usecase';

@Module({
  imports: [],
  controllers: [ArenaController],
  providers: [
    PrismaService,
    CreateArenaUseCase,
    MonthReportUseCase,
    ListAllUseCase,
    FindByIdUseCase,
    FindByUserIdUseCase,
    {
      provide: IArenaRepository,
      useClass: ArenaPrismaRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: AwsStorage,
    },
  ],
})
export class ArenaModule {}
