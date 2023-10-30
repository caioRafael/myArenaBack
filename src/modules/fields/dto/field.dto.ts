import { Arena } from 'src/modules/arena/entities/arena.entity';
import Entity from 'src/types/Entity';

export default interface FieldDto extends Entity {
  name: string;
  price: number;
  openIn: Date;
  closeIn: Date;
  sports: string;
  arenaId: string;
  arena?: Arena;
}
