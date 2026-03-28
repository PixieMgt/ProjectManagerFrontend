export default function normalizeDate(date: string) {
  if (!date) return "";
  return date.split("T")[0];
}
