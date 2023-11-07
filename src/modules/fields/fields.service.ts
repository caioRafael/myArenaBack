import { Injectable } from '@nestjs/common';
import FieldDto from './dto/field.dto';
import { PrismaService } from '../../infra/database/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}
  async create(createFieldDto: FieldDto) {
    const field = await this.prisma.fields.create({
      data: {
        name: createFieldDto.name,
        price: createFieldDto.price,
        openIn: createFieldDto.openIn,
        closeIn: createFieldDto.closeIn,
        arenaId: createFieldDto.arenaId,
        sports: createFieldDto.sports,
      },
    });

    return field;
  }

  async findAll(arenaId: string) {
    const fields = await this.prisma.fields.findMany({
      where: {
        arenaId: arenaId,
      },
    });
    return fields;
  }

  async findOne(id: string) {
    const field = await this.prisma.fields.findUnique({
      where: {
        id: id,
      },
    });

    return field;
  }

  update(id: number, updateFieldDto: FieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
