import { Module } from '@nestjs/common';
import { ArenaService } from './arena.service';
import { ArenaController } from './arena.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { IArenaRepository } from './repositories/arena.repository';
import ArenaPrismaRepository from './repositories/prisma/arena.prisma.repository';

@Module({
  imports: [],
  controllers: [ArenaController],
  providers: [
    ArenaService,
    PrismaService,
    {
      provide: IArenaRepository,
      useClass: ArenaPrismaRepository,
    },
  ],
})
export class ArenaModule {}
