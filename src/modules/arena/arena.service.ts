import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ArenaDto from './dto/arena.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class ArenaService {
  constructor(private prisma: PrismaService) {}
  async create(createArenaDto: ArenaDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: createArenaDto.administrator.email,
      },
    });

    if (user)
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);

    const arena = await this.prisma.arena.findFirst({
      where: {
        OR: [
          { cnpj: createArenaDto.cnpj },
          { phone: createArenaDto.phone },
          { corporateName: createArenaDto.corporateName },
        ],
      },
    });

    if (arena)
      throw new HttpException('Arena ja existe', HttpStatus.BAD_REQUEST);

    const password = await hash(createArenaDto.administrator.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...createArenaDto.administrator,
        password,
      },
    });

    const newArena = await this.prisma.arena.create({
      data: {
        address: createArenaDto.address,
        fantasyName: createArenaDto.fantasyName,
        phone: createArenaDto.phone,
        corporateName: createArenaDto.corporateName,
        cnpj: createArenaDto.cnpj,
        administratorId: newUser.id,
      },
    });
    return newArena;
  }

  async findAll() {
    const arenaList = await this.prisma.arena.findMany();

    return arenaList;
  }

  findOne(id: number) {
    return `This action returns a #${id} arena`;
  }

  update(id: number, updateArenaDto: ArenaDto) {
    return `This action updates a #${id} arena`;
  }

  remove(id: number) {
    return `This action removes a #${id} arena`;
  }
}
