import FieldDto from 'src/modules/fields/dto/field.dto';

export default function findHours(field: FieldDto) {
  const hours = Array.from(
    { length: field.closeIn - field.openIn },
    (_, index) => field.openIn + index,
  );

  const bookedHours = field.ScheduleTime.reduce((acc, schedule) => {
    const booked = Array.from(
      { length: schedule.amountHours },
      (_, index) => schedule.hour + index,
    );
    return [...acc, ...booked];
  }, []);

  const availableHours = hours.filter((hour) => !bookedHours.includes(hour));

  return availableHours;
}
