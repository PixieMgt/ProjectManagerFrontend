import displayDate from "./displayDate";
import hoursToHoursMinutes from "./hoursToHoursMinutes";
import minutesToHoursMinutes from "./minutesToHoursMinutes";

export default function getFieldValue(obj: any, path: string) {
  let value = path.split(".").reduce((acc, part) => acc?.[part], obj);
  if (path.toLowerCase().includes("minutes"))
    value = minutesToHoursMinutes(value);
  if (path.toLowerCase().includes("hours")) value = hoursToHoursMinutes(value);
  if (path.toLowerCase().includes("date")) value = displayDate(value);
  if (path.toLowerCase().includes("deadline")) value = displayDate(value);
  return value;
}
