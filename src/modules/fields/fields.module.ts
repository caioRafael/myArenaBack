import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { IFieldRepository } from './reositories/field.reosritory';
import FieldPrismaRepository from './reositories/prisma/field.prisma.repository';
import { CreateFieldUseCase } from './useCases/create-field.usecase';
import { FindFieldByArenaId } from './useCases/find-field-by-arena-id.usecase';
import { FindFieldByIdUseCase } from './useCases/find-field-by-id.usecase';

@Module({
  controllers: [FieldsController],
  providers: [
    PrismaService,
    CreateFieldUseCase,
    FindFieldByArenaId,
    FindFieldByIdUseCase,
    {
      provide: IFieldRepository,
      useClass: FieldPrismaRepository,
    },
  ],
})
export class FieldsModule {}
