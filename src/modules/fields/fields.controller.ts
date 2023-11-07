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
('./dto/field.dto');

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFieldDto: FieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get('arena/:arenaId')
  findAll(@Param('arenaId') arenaId: string) {
    return this.fieldsService.findAll(arenaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: FieldDto) {
    return this.fieldsService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(+id);
  }
}
