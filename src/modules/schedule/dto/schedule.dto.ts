import FieldDto from 'src/modules/fields/dto/field.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';
import Entity from 'src/types/Entity';

export default interface ScheduleDto extends Entity {
  date: Date;
  hour: number;
  endHour?: number;
  amountHours: number;
  userId: string;
  user: UserDto;
  sport: string;
  fieldId: string;
  field?: FieldDto;
  price: number;
  code?: string;
  status:
    | 'DOWN_PAYMENT'
    | 'APPROVED'
    | 'STARTED'
    | 'FINISHED'
    | 'FINAL_PAYMENT'
    | 'CLOSED'
    | 'CANCEL'
    | string;
}
