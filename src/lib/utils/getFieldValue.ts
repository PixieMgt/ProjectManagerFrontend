import format from "./formatting/format";

export default function getFieldValue(obj: any, path: string) {
  let value = path.split(".").reduce((acc, part) => acc?.[part], obj);
  if (path.toLowerCase().includes("minutes")) value = format("minutes", value);
  if (path.toLowerCase().includes("hours")) value = format("hours", value);
  if (path.toLowerCase().includes("date")) value = format("date", value);
  if (path.toLowerCase().includes("deadline")) value = format("date", value);
  if (path.toLowerCase().includes("time")) value = format("time", value);
  if (path.toLowerCase().includes("status")) value = format("status", value);
  if (path.toLowerCase().includes("priority"))
    value = format("priority", value);
  if (path.toLowerCase().includes("hourlyrate"))
    value = format("currency", value);
  if (path.toLowerCase().includes("role")) value = format("role", value);
  return value;
}
