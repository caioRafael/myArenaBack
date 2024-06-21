import { FindByDateUseCase } from './useCases/find-by-date.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import ScheduleDto from './dto/schedule.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ScheduleGateway } from './schedule.gateway';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  CreateScheduleSchema,
  CreateScheduleSchemaDTO,
  QueryParam,
} from './shcema/create-schedule.schema';
import { CreateScheduleUseCase } from './useCases/create-schedule.usecase';
import { FindByFieldIdUseCase } from './useCases/find-by-field-id.usecase';
import { FindByArenaIdUseCase } from './useCases/find-by-arena-id.usecase';
import { FindAvaliableTimesUseCase } from './useCases/find-avaliables-time.usecase';
import { ReportUseCase } from './useCases/report.usecase';
import { UpdateStatusUseCase } from './useCases/update-status.usecase';
import { FindByCodeUseCase } from './useCases/find-by-code.usecase';
import { CancelScheduleUseCase } from './useCases/cancel-schedule.usecase';

interface QueryParam {
  date: string;
  code?: string;
}

const scheduleSchemaSwagger = zodToOpenAPI(CreateScheduleSchema);
const queryParamsSchema = zodToOpenAPI(QueryParam);

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private scheduleGatway: ScheduleGateway,
    private createScheduleUseCase: CreateScheduleUseCase,
    private findByFieldIdUseCase: FindByFieldIdUseCase,
    private findByArenaIdUseCase: FindByArenaIdUseCase,
    private findByDateUseCase: FindByDateUseCase,
    private findAvaliableTimesUseCase: FindAvaliableTimesUseCase,
    private reportUseCase: ReportUseCase,
    private updateStatusUseCase: UpdateStatusUseCase,
    private findByCodeUseCase: FindByCodeUseCase,
    private cancelScheduleUseCase: CancelScheduleUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({
    description: 'Create schedule time',
    schema: scheduleSchemaSwagger,
  })
  create(@Body() createScheduleDto: CreateScheduleSchemaDTO) {
    this.scheduleGatway.findSchedules();
    return this.createScheduleUseCase.execute(createScheduleDto as ScheduleDto);
  }

  @Get('field/:fieldId')
  findByField(@Param('fieldId') fieldId: string, @Query() param: QueryParam) {
    return this.findByFieldIdUseCase.execute(fieldId, new Date(param.date));
  }

  @Get('times/:fieldId')
  findAvaliableTimes(
    @Param('fieldId') fieldId: string,
    @Query() param: QueryParam,
  ) {
    return this.findAvaliableTimesUseCase.execute(
      fieldId,
      new Date(param.date),
    );
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'date',
  })
  @ApiQuery({
    name: 'code',
    required: false,
  })
  @UseGuards(AuthGuard)
  @Get('arena/:arenaId')
  findByArena(@Param('arenaId') arenaId: string, @Query() param: QueryParam) {
    return this.findByArenaIdUseCase.execute(
      arenaId,
      new Date(param.date),
      param.code,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':date')
  findByDate(@Param('date') date: string) {
    return this.findByDateUseCase.execute(new Date(date));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/status/:id')
  updateStatus(@Param('id') id: string, @Body() status: Partial<ScheduleDto>) {
    return this.updateStatusUseCase.execute(id, status.status);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('report')
  report() {
    return this.reportUseCase.execute();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('code/:code')
  getByCode(@Param('code') code: string) {
    return this.findByCodeUseCase.execute(code);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('cancel/:scheduleId')
  cancelSchedule(@Param('scheduleId') scheduleId: string, @Request() request) {
    return this.cancelScheduleUseCase.execute(request.user.sub, scheduleId);
  }
}
