import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArenaModule } from './modules/arena/arena.module';
import { ArenaService } from './modules/arena/arena.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaService } from './infra/database/prisma.service';

@Module({
  imports: [ArenaModule],
  controllers: [AppController],
  providers: [
    AppService,
    ArenaService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
