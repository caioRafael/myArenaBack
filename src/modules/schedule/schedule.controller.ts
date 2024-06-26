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
import { ScheduleService } from './schedule.service';
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
    private readonly scheduleService: ScheduleService,
    private scheduleGatway: ScheduleGateway,
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
    return this.scheduleService.create(createScheduleDto as ScheduleDto);
  }

  @Get('field/:fieldId')
  findByField(@Param('fieldId') fieldId: string, @Query() param: QueryParam) {
    return this.scheduleService.FindByField(fieldId, new Date(param.date));
  }

  @Get('times/:fieldId')
  findAvaliableTimes(
    @Param('fieldId') fieldId: string,
    @Query() param: QueryParam,
  ) {
    return this.scheduleService.findAvaliableTimes(
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
    return this.scheduleService.FindByArena(
      arenaId,
      new Date(param.date),
      param.code,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':date')
  findByDate(@Param('date') date: string) {
    return this.scheduleService.FindByDate(new Date(date));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/status/:id')
  updateStatus(@Param('id') id: string, @Body() status: Partial<ScheduleDto>) {
    return this.scheduleService.updateStatus(id, status.status);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('report')
  report() {
    return this.scheduleService.report();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('code/:code')
  getByCode(@Param('code') code: string) {
    return this.scheduleService.findByCode(code);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('cancel/:scheduleId')
  cancelSchedule(@Param('scheduleId') scheduleId: string, @Request() request) {
    return this.scheduleService.cancelSchedule(request.user.sub, scheduleId);
  }
}
