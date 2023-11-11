import FieldDto from 'src/modules/fields/dto/field.dto';
import Entity from 'src/types/Entity';

export default interface ScheduleDto extends Entity {
  date: Date;
  hour: number;
  endHour?: number;
  amountHours: number;
  clientName: string;
  clientPhone: string;
  sport: string;
  fieldId: string;
  field?: FieldDto;
  price: number;
  status:
    | 'DOWN_PAYMENT'
    | 'APPROVED'
    | 'STARTED'
    | 'FINISHED'
    | 'FINAL_PAYMENT'
    | 'CLOSED'
    | string;
}
