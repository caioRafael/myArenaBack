import FieldDto from 'src/modules/fields/dto/field.dto';
import ScheduleDto from '../dto/schedule.dto';

export abstract class IScheduleRepository {
  abstract create(data: ScheduleDto): Promise<ScheduleDto | null>;
  abstract findField(fieldId: string, date: Date): Promise<FieldDto | null>;
  abstract findByField(fieldId: string, date?: Date): Promise<ScheduleDto[]>;
  abstract findByArena(
    arenaId: string,
    date?: Date,
    code?: string,
  ): Promise<ScheduleDto[]>;
  abstract findByDate(date: Date): Promise<ScheduleDto[]>;
  abstract findAvaliableTimes(fieldId: string, date?: Date): Promise<FieldDto>;
  abstract updateStatus(
    id: string,
    status: string,
  ): Promise<ScheduleDto | null>;
  abstract findByCode(code: string): Promise<ScheduleDto>;
  abstract cancelSchedule(
    userId: string,
    scheduleId: string,
  ): Promise<ScheduleDto | null>;
}
