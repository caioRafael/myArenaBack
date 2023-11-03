import FieldDto from 'src/modules/fields/dto/field.dto';
import Entity from 'src/types/Entity';

export default interface ScheduleDto extends Entity {
  date: Date;
  hour: Date;
  endHour?: Date;
  amountHours: number;
  clientName: string;
  clientPhone: string;
  sport: string;
  fieldId: string;
  field?: FieldDto;
}