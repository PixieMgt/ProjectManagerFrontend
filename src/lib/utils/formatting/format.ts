import formatDate from "./formatDate";
import formatTime from "./formatTime";
import formatMinutes from "./formatMinutes";
import formatHours from "./formatHours";
import formatCurrency from "./formatCurrency";
import formatStatus from "./formatStatus";
import formatPriority from "./formatPriority";
import formatRole from "./formatRole";

type FormatType =
  | "string"
  | "date"
  | "time"
  | "minutes"
  | "hours"
  | "currency"
  | "status"
  | "priority"
  | "role";

export default function format(type: FormatType, value?: any): string {
  if (!value) return "/";
  switch (type) {
    case "string":
      return String(value);
    case "date":
      return formatDate(value);
    case "time":
      return formatTime(value);
    case "minutes":
      return formatMinutes(value);
    case "hours":
      return formatHours(value);
    case "currency":
      return formatCurrency(value);
    case "status":
      return formatStatus(value);
    case "priority":
      return formatPriority(value);
    case "role":
      return formatRole(value);
    default:
      return String(value);
  }
}
