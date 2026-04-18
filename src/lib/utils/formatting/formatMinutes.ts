export default function formatMinutes(value: number): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  let result = "";
  result += hours > 0 ? `${hours}hr` : "";
  result += minutes > 0 ? ` ${minutes}min` : "";
  return result.length > 0 ? result : "/";
}
