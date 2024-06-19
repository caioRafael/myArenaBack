import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import ArenaDto from './dto/arena.dto';
import {
  CreateArenaSchemaDTO,
  CreateArenaSquema,
} from './shcema/create-arena.schema';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { CreateArenaUseCase } from './useCases/create-arena.usecase';
import { MonthReportUseCase } from './useCases/month-report.usecase';
import { ListAllUseCase } from './useCases/list-all.usecase';
import { FindByIdUseCase } from './useCases/find-by-id.usecase';
import { FindByUserIdUseCase } from './useCases/find-by-userId.usecase';

const arenaSchemaSwagger = zodToOpenAPI(CreateArenaSquema);

@ApiTags('arena')
@Controller('arena')
export class ArenaController {
  constructor(
    private createArenaUseCase: CreateArenaUseCase,
    private monthReportUseCase: MonthReportUseCase,
    private listAllUseCase: ListAllUseCase,
    private findByIdUseCase: FindByIdUseCase,
    private findByUserIdUseCase: FindByUserIdUseCase,
  ) {}

  @Post()
  @ApiBody({
    description: 'Creation of arenas and administrators',
    schema: arenaSchemaSwagger,
  })
  @ApiResponse({ status: 201, description: 'Arena criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Usuário ou arena já existem' })
  create(@Body() createArenaDto: CreateArenaSchemaDTO) {
    return this.createArenaUseCase.execute(createArenaDto as ArenaDto);
  }

  @Get()
  findAll() {
    return this.listAllUseCase.execute();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('report')
  async report(@Request() request) {
    const data = await this.monthReportUseCase.execute(request.user.sub);
    return JSON.parse(
      JSON.stringify(
        data,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.findByUserIdUseCase.execute(userId);
  }

  @Get()
  findOne(@Request() request) {
    return this.findByIdUseCase.execute(request.user.sub);
  }
}
