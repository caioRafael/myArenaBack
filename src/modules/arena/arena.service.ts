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

    const newArena = await this.prisma.arena.create({
      data: {
        address: createArenaDto.address,
        fantasyName: createArenaDto.fantasyName,
        phone: createArenaDto.phone,
        corporateName: createArenaDto.corporateName,
        cnpj: createArenaDto?.cnpj,
      },
    });

    const newUser = await this.prisma.user.create({
      data: {
        email: createArenaDto.administrator.email,
        name: createArenaDto.administrator.name,
        nickname: createArenaDto.administrator.nickname,
        password: password,
        profile: 'ADMINISTRATOR',
        arenaId: newArena.id,
      },
    });

    if (newArena && newUser) return newArena;
  }

  async findAll() {
    const arenaList = await this.prisma.arena.findMany();

    return arenaList;
  }

  async findByUser(userId: string) {
    const arena = await this.prisma.arena.findFirst({
      where: {
        employees: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        employees: true,
      },
    });

    return arena;
  }

  async findOne(id: string) {
    const arena = await this.prisma.arena.findUnique({
      where: {
        id: id,
      },
    });

    return arena;
  }

  async monthReport(id: string) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // +1 porque os meses em JavaScript vão de 0 a 11
    const anoAtual = dataAtual.getFullYear();

    const arenaReport = await this.prisma.fields.findMany({
      where: {
        arenaId: id,
      },
      include: {
        _count: {
          select: {
            ScheduleTime: {
              where: {
                date: {
                  gte: new Date(`${anoAtual}-${mesAtual}-01`),
                  lt: new Date(
                    `${mesAtual + 1 === 13 ? anoAtual + 1 : anoAtual}-${
                      mesAtual + 1 === 13 ? 1 : mesAtual + 1
                    }-01`,
                  ),
                },
              },
            },
          },
        },
      },
    });

    // const teste = await this.prisma.scheduleTime.aggregate({
    //   where: {
    //     AND: [
    //       { field: { arenaId: id } },
    //       {
    //         date: {
    //           gte: new Date(`${anoAtual}-${mesAtual}-01`),
    //           lt: new Date(`${anoAtual}-${mesAtual + 1}-01`),
    //         },
    //       },
    //     ],
    //   },
    //   _sum: {
    //     price: true,
    //   },
    //   _count: true,
    // });

    return arenaReport;
  }

  update(id: number, updateArenaDto: ArenaDto) {
    return `This action updates a #${id} arena`;
  }

  remove(id: number) {
    return `This action removes a #${id} arena`;
  }
}
