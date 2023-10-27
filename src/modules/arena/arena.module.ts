import { Module } from '@nestjs/common';
import { ArenaService } from './arena.service';
import { ArenaController } from './arena.controller';
import { PrismaService } from '../../infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [ArenaController],
  providers: [ArenaService, PrismaService],
})
export class ArenaModule {}
