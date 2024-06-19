import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { IFieldRepository } from './reositories/field.reosritory';
import FieldPrismaRepository from './reositories/prisma/field.prisma.repository';

@Module({
  controllers: [FieldsController],
  providers: [
    FieldsService,
    PrismaService,
    {
      provide: IFieldRepository,
      useClass: FieldPrismaRepository,
    },
  ],
})
export class FieldsModule {}
