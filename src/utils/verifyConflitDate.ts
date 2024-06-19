import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';

export default function verifyConflitDate(
  list: ScheduleDto[],
  schedule: { hour: number; endHour: number },
) {
  return list.some((item) => {
    return (
      (schedule.hour >= item.hour && schedule.hour < item.endHour) ||
      (schedule.endHour > item.hour && schedule.endHour <= item.endHour) ||
      (schedule.hour <= item.hour && schedule.endHour >= item.endHour)
    );
  });
}
