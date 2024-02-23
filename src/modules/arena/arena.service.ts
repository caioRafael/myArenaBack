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
        OR: [
          { email: createArenaDto.administrator.email },
          { phone: createArenaDto.administrator.phone },
        ],
      },
    });

    if (user && user.email === createArenaDto.administrator.email)
      throw new HttpException(
        'Esse e-mail ja está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (user && user.phone === createArenaDto.administrator.phone)
      throw new HttpException(
        'Já existe um usuário com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const arena = await this.prisma.arena.findFirst({
      where: {
        OR: [
          { cnpj: createArenaDto.cnpj },
          { phone: createArenaDto.phone },
          { corporateName: createArenaDto.corporateName },
        ],
      },
    });

    if (arena && arena.cnpj === createArenaDto.cnpj)
      throw new HttpException(
        'Esse CNPJ já está cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.corporateName === createArenaDto.corporateName)
      throw new HttpException(
        'Essa razão social já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );

    if (arena && arena.phone === createArenaDto.phone)
      throw new HttpException(
        'Já existe uma arena com esse número de telefone cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    const password = await hash(createArenaDto.administrator.password, 10);

    const newArena = await this.prisma.arena.create({
      data: {
        address: createArenaDto.address,
        fantasyName: createArenaDto.fantasyName,
        phone: createArenaDto.phone,
        corporateName: createArenaDto.corporateName,
        cnpj: createArenaDto?.cnpj,
        pixKey: createArenaDto?.pixKey,
        requirePrePayment: createArenaDto.requirePrePayment,
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
        phone: createArenaDto.administrator.phone,
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

    // const arenaReport = await this.prisma.fields.findMany({
    //   where: {
    //     arenaId: id,
    //   },
    //   include: {
    //     _count: {
    //       select: {
    //         ScheduleTime: {
    //           where: {
    //             date: {
    //               gte: new Date(`${anoAtual}-${mesAtual}-01`),
    //               lt: new Date(
    //                 `${mesAtual + 1 === 13 ? anoAtual + 1 : anoAtual}-${
    //                   mesAtual + 1 === 13 ? 1 : mesAtual + 1
    //                 }-01`,
    //               ),
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const arenaReport = await this.prisma.$queryRaw`
      SELECT 
        count(*) as schedules, 
        SUM(fields.price) as espec,
        SUM(CASE 
            WHEN shcedule_time.status IN ('APPROVED', 'STARTED', 'FINISHED')
            THEN fields.price / 2 
            WHEN shcedule_time.status IN ('FINAL_PAYMENT', 'CLOSED')
            THEN fields.price
            ELSE 0 END) as revenue
      FROM fields 
        LEFT JOIN shcedule_time on fields.id = shcedule_time."fieldId"
        WHERE fields."arenaId" = ${id}
        AND shcedule_time.date BETWEEN ${new Date(
          `${anoAtual}-${mesAtual}-01`,
        )} AND ${new Date(
      `${mesAtual + 1 === 13 ? anoAtual + 1 : anoAtual}-${
        mesAtual + 1 === 13 ? 1 : mesAtual + 1
      }-01`,
    )}`;

    // console.log(arenaReport);
    return arenaReport[0];
  }
}
