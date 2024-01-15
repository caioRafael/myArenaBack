import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ArenaService } from './arena.service';
import ArenaDto from './dto/arena.dto';
import {
  CreateArenaSchemaDTO,
  CreateArenaSquema,
} from './shcema/create-arena.schema';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

const arenaSchemaSwagger = zodToOpenAPI(CreateArenaSquema);

@ApiTags('arena')
@Controller('arena')
export class ArenaController {
  constructor(private readonly arenaService: ArenaService) {}

  @Post()
  @ApiBody({
    description: 'Creation of arenas and administrators',
    schema: arenaSchemaSwagger,
  })
  @ApiResponse({ status: 201, description: 'Arena criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Usuário ou arena já existem' })
  create(@Body() createArenaDto: CreateArenaSchemaDTO) {
    return this.arenaService.create(createArenaDto as ArenaDto);
  }

  @Get()
  findAll() {
    return this.arenaService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('report/:id')
  report(@Param('id') id: string) {
    return this.arenaService.monthReport(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.arenaService.findByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arenaService.findOne(id);
  }
}
