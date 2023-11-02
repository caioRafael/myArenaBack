export function mutateDate(date: Date): Date {
  const updateDate = date;
  updateDate.setHours(0, 0, 0, 0);
  console.log(updateDate);
  return updateDate;
}

export function mutateTime(time: Date): Date {
  const updateTime = time;
  updateTime.setDate(1);
  updateTime.setMonth(0);
  return updateTime;
}
