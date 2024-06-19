import { CreateUserUseCase } from './useCases/create-user.usecase';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import UserPrismaRepository from './repositories/prisma/user.prisma.repository';
import { IStorage } from 'src/infra/providers/storage/storage';
import AwsStorage from 'src/infra/providers/storage/aws.storage';
import { FindUserByIdUseCase } from './useCases/find-user-by-id.usecase';
import { FindSchedulesUserUseCase } from './useCases/find-schedules-user.usecase';
import { UpdateUserUseCase } from './useCases/update-user.usecase';
import { DeleteUserUseCase } from './useCases/delete-user.usecase';
import { UploadAvatarUseCase } from './useCases/upload-avatar.usecase';
import { DeleteAvatarUseCase } from './useCases/delete-avatar.usecase';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindSchedulesUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UploadAvatarUseCase,
    DeleteAvatarUseCase,
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
