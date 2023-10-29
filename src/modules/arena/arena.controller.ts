import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArenaService } from './arena.service';
import ArenaDto from './dto/arena.dto';
import { CreateArenaSchemaDTO } from './shcema/create-arena.schema';

@Controller('arena')
export class ArenaController {
  constructor(private readonly arenaService: ArenaService) {}

  @Post()
  create(@Body() createArenaDto: CreateArenaSchemaDTO) {
    return this.arenaService.create(createArenaDto as ArenaDto);
  }

  @Get()
  findAll() {
    return this.arenaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arenaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArenaDto: ArenaDto) {
    return this.arenaService.update(+id, updateArenaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arenaService.remove(+id);
  }
}
