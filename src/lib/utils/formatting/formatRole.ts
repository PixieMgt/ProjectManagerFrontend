export default function formatRole(value: string): string {
  switch (value) {
    case "owner":
      return "Owner";
    case "developer":
      return "Developer";
    case "tester":
      return "Tester";
    case "viewer":
      return "Viewer";
    default:
      return String(value);
  }
}
