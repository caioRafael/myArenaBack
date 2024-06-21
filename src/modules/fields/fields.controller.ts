import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import FieldDto from './dto/field.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateFieldSquemaDTO,
  CreateFieldSquema,
} from './schema/create-field.schema';
import { zodToOpenAPI } from 'nestjs-zod';
import { CreateFieldUseCase } from './useCases/create-field.usecase';
import { FindFieldByArenaId } from './useCases/find-field-by-arena-id.usecase';
import { FindFieldByIdUseCase } from './useCases/find-field-by-id.usecase';

const fieldSchemaSwagger = zodToOpenAPI(CreateFieldSquema);

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(
    private createFieldUseCase: CreateFieldUseCase,
    private findFieldByArenaId: FindFieldByArenaId,
    private findFieldById: FindFieldByIdUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: fieldSchemaSwagger,
  })
  @Post()
  create(@Body() createFieldDto: CreateFieldSquemaDTO) {
    return this.createFieldUseCase.execute(createFieldDto as FieldDto);
  }

  @Get('arena/:arenaId')
  findAll(@Param('arenaId') arenaId: string) {
    return this.findFieldByArenaId.execute(arenaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findFieldById.execute(id);
  }
}
