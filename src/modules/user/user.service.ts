import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/infra/database/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: UserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (user)
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);

    if (
      (createUserDto.profile === 'EMPLOYEE' ||
        createUserDto.profile === 'ADMINISTRATOR') &&
      (createUserDto.arenaId === undefined || createUserDto.arenaId === null)
    ) {
      throw new HttpException(
        'Perfil de funcionário precisa estar vinculado a uma emrpesa',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await hash(createUserDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password,
      },
    });

    return newUser;
  }

  async findAll(arenaId: string) {
    const users = await this.prisma.user.findMany({
      where: {
        arenaId,
      },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
