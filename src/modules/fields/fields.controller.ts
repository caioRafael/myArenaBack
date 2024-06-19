import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import FieldDto from './dto/field.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateFieldSquemaDTO,
  CreateFieldSquema,
} from './schema/create-field.schema';
import { zodToOpenAPI } from 'nestjs-zod';

const fieldSchemaSwagger = zodToOpenAPI(CreateFieldSquema);

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: fieldSchemaSwagger,
  })
  @Post()
  create(@Body() createFieldDto: CreateFieldSquemaDTO) {
    return this.fieldsService.create(createFieldDto as FieldDto);
  }

  @Get('arena/:arenaId')
  findAll(@Param('arenaId') arenaId: string) {
    return this.fieldsService.findAll(arenaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }
}
