export default function minutesToHoursMinutes(value: number): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours}hr ${minutes}min`;
}
