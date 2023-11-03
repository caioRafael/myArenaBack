// import FieldDto from 'src/modules/fields/dto/field.dto';

// export default function findTimes(field: FieldDto): Date[] {
//   const availableTimes: Date[] = [];
//   const { openIn, closeIn } = field;

//   const currentTime = new Date(openIn);
//   while (currentTime < closeIn) {
//     availableTimes.push(new Date(currentTime));
//     currentTime.setHours(currentTime.getHours() + 1);
//   }

//   for (const schedule of field?.ScheduleTime) {
//     const scheduleStart = new Date(schedule.hour);
//     const scheduleEnd = schedule.endHour ? new Date(schedule.endHour) : null;

//     for (let i = 0; i < availableTimes.length; i++) {
//       const time = availableTimes[i];

//       if (
//         (scheduleEnd && time >= scheduleStart && time < scheduleEnd) ||
//         (!scheduleEnd && time >= scheduleStart)
//       ) {
//         availableTimes.splice(i, 1);
//         i--;
//       }
//     }
//   }

//   return availableTimes;
// }
