import { Injectable } from '@nestjs/common';
import { ILoginReository } from '../login.reository';
import { UserDto } from 'src/modules/arena/dto/arena.dto';
import { CreateLoginDto } from '../../dto/create-login.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export default class LoginrismaRepository implements ILoginReository {
  constructor(private prisma: PrismaService) {}
  async findUserByEmail(credentials: CreateLoginDto): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
      include: {
        arena: true,
      },
    });

    return user;
  }
}
