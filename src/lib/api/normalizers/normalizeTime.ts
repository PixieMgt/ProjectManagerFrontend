export default function normalizeTime(time: string) {
  if (!time) return "";
  return time.split("T")[1]?.slice(0, 5);
}
