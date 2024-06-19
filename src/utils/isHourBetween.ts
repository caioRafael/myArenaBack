export default function isHourBetween(
  openIn: number,
  closeIn: number,
  hour: number,
): boolean {
  const openHour = openIn;
  const closeHour = closeIn;
  const hourToCheck = hour;

  return hourToCheck >= openHour && hourToCheck < closeHour;
}
