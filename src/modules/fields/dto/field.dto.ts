import ArenaDto from 'src/modules/arena/dto/arena.dto';
import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import Entity from 'src/types/Entity';

export default interface FieldDto extends Entity {
  name: string;
  price: number;
  openIn: number;
  closeIn: number;
  sports: string;
  arenaId: string;
  arena?: ArenaDto;
  ScheduleTime?: ScheduleDto[];
}
