export default function isHourBetween(
  openIn: Date,
  closeIn: Date,
  hour: Date,
): boolean {
  const openHour = openIn.getHours();
  const closeHour = closeIn.getHours();
  const hourToCheck = hour.getHours();

  return hourToCheck >= openHour && hourToCheck < closeHour;
}
