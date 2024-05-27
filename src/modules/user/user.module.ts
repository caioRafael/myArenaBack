import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import UserPrismaRepository from './repositories/prisma/user.prisma.repository';
import { IStorage } from 'src/infra/providers/storage/storage';
import AwsStorage from 'src/infra/providers/storage/aws.storage';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
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
export class UserModule {}
