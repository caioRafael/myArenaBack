import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import ScheduleDto from './dto/schedule.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ScheduleGateway } from './schedule.gateway';

interface QueryParam {
  date: string;
}

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private scheduleGatway: ScheduleGateway,
  ) {}

  @Post()
  create(@Body() createScheduleDto: ScheduleDto) {
    this.scheduleGatway.findSchedules();
    return this.scheduleService.create(createScheduleDto);
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

  @Get('arena/:arenaId')
  findByArena(@Param('arenaId') arenaId: string, @Query() param: QueryParam) {
    return this.scheduleService.FindByArena(arenaId, new Date(param.date));
  }

  @UseGuards(AuthGuard)
  @Get(':date')
  findByDate(@Param('date') date: string) {
    return this.scheduleService.FindByDate(new Date(date));
  }

  @Patch('/status/:id')
  updateStatus(@Param('id') id: string, @Body() status: Partial<ScheduleDto>) {
    return this.scheduleService.updateStatus(id, status.status);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: ScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }

  @Get('report')
  report() {
    return this.scheduleService.report();
  }
}
