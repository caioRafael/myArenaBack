import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { FileDto, UserDto } from '../../dto/user.dto';
import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import { IStorage } from 'src/infra/providers/storage/storage';

@Injectable()
export default class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService, private storage: IStorage) {}

  async create(data: UserDto): Promise<UserDto> {
    const newUser = await this.prisma.user.create({
      data,
    });

    return newUser;
  }

  async findUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findAll(arenaId: string): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      where: {
        arenaId,
      },
    });

    return users;
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findSchedulesByUser(id: string): Promise<ScheduleDto[]> {
    const schedules = await this.prisma.scheduleTime.findMany({
      where: {
        userId: id,
      },
      include: {
        field: {
          include: {
            arena: true,
          },
        },
      },
    });

    return schedules as ScheduleDto[];
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return user;
  }

  async upload(avatarUrl: string, userId: string): Promise<UserDto> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatarUrl,
      },
    });
    return user;
  }

  async deleteAvatar(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: null,
      },
    });
  }
}
