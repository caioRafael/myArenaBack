import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import UserPrismaRepository from './repositories/prisma/user.prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
