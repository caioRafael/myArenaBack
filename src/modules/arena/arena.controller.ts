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
import { ArenaService } from './arena.service';
import ArenaDto from './dto/arena.dto';
import { CreateArenaSchemaDTO } from './shcema/create-arena.schema';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

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

  @UseGuards(AuthGuard)
  @Get('report/:id')
  report(@Param('id') id: string) {
    return this.arenaService.monthReport(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.arenaService.findByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arenaService.findOne(id);
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
