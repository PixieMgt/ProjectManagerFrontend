export default function hoursToHoursMinutes(value: number): string {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return `${hours}hr ${minutes}min`;
}
