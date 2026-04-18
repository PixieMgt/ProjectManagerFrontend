export default function formatStatus(value: string): string {
  switch (value) {
    // Project statuses
    case "planning":
      return "Planning";
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    case "archived":
      return "Archived";

    // Task statuses
    case "todo":
      return "To do";
    case "in_progress":
      return "In progress";
    case "review":
      return "Review";
    case "done":
      return "Done";
    default:
      return String(value);
  }
}
