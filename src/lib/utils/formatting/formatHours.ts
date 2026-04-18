import formatMinutes from "./formatMinutes";

export default function formatHours(value: number): string {
  const minutes = value * 60;
  return formatMinutes(minutes);
}
