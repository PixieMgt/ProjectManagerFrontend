export default function getRootPage(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[0] || "";
}
