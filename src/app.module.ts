import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ArenaModule } from './modules/arena/arena.module';
import { ArenaService } from './modules/arena/arena.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaService } from './infra/database/prisma.service';
import { LoginModule } from './modules/login/login.module';
import { FieldsModule } from './modules/fields/fields.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ArenaModule, LoginModule, FieldsModule, ScheduleModule, UserModule],
  controllers: [],
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
