import { Arena } from 'src/modules/arena/entities/arena.entity';
import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import Entity from 'src/types/Entity';

export default interface FieldDto extends Entity {
  name: string;
  price: number;
  openIn: Date;
  closeIn: Date;
  sports: string;
  arenaId: string;
  arena?: Arena;
  ScheduleTime?: ScheduleDto[];
}
