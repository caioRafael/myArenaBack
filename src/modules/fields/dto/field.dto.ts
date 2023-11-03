import { Arena } from 'src/modules/arena/entities/arena.entity';
import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import Entity from 'src/types/Entity';

export default interface FieldDto extends Entity {
  name: string;
  price: number;
  openIn: number;
  closeIn: number;
  sports: string;
  arenaId: string;
  arena?: Arena;
  ScheduleTime?: ScheduleDto[];
}
