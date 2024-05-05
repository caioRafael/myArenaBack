import { Injectable } from '@nestjs/common';
import { IFieldRepository } from '../field.reosritory';
import { PrismaService } from 'src/infra/database/prisma.service';
import FieldDto from '../../dto/field.dto';

@Injectable()
export default class FieldPrismaRepository implements IFieldRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: FieldDto): Promise<FieldDto> {
    const field = await this.prisma.fields.create({
      data: {
        name: data.name,
        price: data.price,
        openIn: data.openIn,
        closeIn: data.closeIn,
        arenaId: data.arenaId,
        sports: data.sports,
      },
    });

    return field;
  }

  async findAllByArena(arenaId: string): Promise<FieldDto[]> {
    const fields = await this.prisma.fields.findMany({
      where: {
        arenaId: arenaId,
      },
    });
    return fields;
  }

  async findOne(id: string): Promise<FieldDto> {
    const field = await this.prisma.fields.findUnique({
      where: {
        id: id,
      },
    });

    return field;
  }
}
