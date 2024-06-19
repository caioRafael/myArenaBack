import { Injectable } from '@nestjs/common';
import { IArenaRepository } from '../arena.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import ArenaDto, { UserDto } from '../../dto/arena.dto';

@Injectable()
export default class ArenaPrismaRepository implements IArenaRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmailOrPhone(email: string, phone: string): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    return user;
  }

  async findArenaByCnpjOrPhoneOrCorporateName(
    cnpj: string,
    phone: string,
    corporateName: string,
  ): Promise<ArenaDto> {
    const arena = await this.prisma.arena.findFirst({
      where: {
        OR: [
          { cnpj: cnpj },
          { phone: phone },
          { corporateName: corporateName },
        ],
      },
    });
    return arena as ArenaDto;
  }

  async createArena(arena: ArenaDto): Promise<ArenaDto> {
    const newArena = await this.prisma.arena.create({
      data: {
        address: arena.address,
        fantasyName: arena.fantasyName,
        phone: arena.phone,
        corporateName: arena.corporateName,
        cnpj: arena?.cnpj,
        pixKey: arena?.pixKey,
        requirePrePayment: arena.requirePrePayment,
        cep: arena.cep,
        city: arena.city,
        locale: arena.locale,
        uf: arena.uf,
      },
    });

    return newArena as ArenaDto;
  }

  async createAdministrator(user: UserDto): Promise<UserDto> {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        password: user.password,
        profile: user.profile,
        arenaId: user.arenaId,
        phone: user.phone,
      },
    });

    return newUser;
  }

  async findAll(): Promise<ArenaDto[]> {
    const arenaList = await this.prisma.arena.findMany();

    return arenaList as ArenaDto[];
  }

  async findByUser(userId: string): Promise<ArenaDto> {
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

  async findOne(id: string): Promise<ArenaDto> {
    const arena = await this.prisma.arena.findUnique({
      where: {
        id: id,
      },
    });

    return arena as ArenaDto;
  }

  async monthReport(id: string): Promise<any> {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // +1 porque os meses em JavaScript vão de 0 a 11
    const anoAtual = dataAtual.getFullYear();

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

    return arenaReport[0];
  }
}
