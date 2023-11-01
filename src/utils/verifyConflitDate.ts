import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';

export default function verifyConflitDate(
  list: ScheduleDto[],
  schedule: { hour: Date; endHour: Date },
) {
  return list.some((item) => {
    return (
      (schedule.hour.getHours() >= item.hour.getHours() &&
        schedule.hour.getHours() < item.endHour.getHours()) ||
      (schedule.endHour.getHours() > item.hour.getHours() &&
        schedule.endHour.getHours() <= item.endHour.getHours()) ||
      (schedule.hour.getHours() <= item.hour.getHours() &&
        schedule.endHour.getHours() >= item.endHour.getHours())
    );
  });
}
