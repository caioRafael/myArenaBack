export default function isHourBetween(
  openIn: Date,
  closeIn: Date,
  hour: Date,
): boolean {
  console.log('Abre', openIn);
  console.log('Fecha', closeIn);
  console.log('hora', hour);
  const openHour = openIn.getHours();
  const closeHour = closeIn.getHours();
  const hourToCheck = hour.getHours();

  return hourToCheck >= openHour && hourToCheck < closeHour;
}
