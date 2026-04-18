export default function formatDate(value: string): string {
  const arr = value.split("-");
  const day = arr[2];
  const month = arr[1];
  const year = arr[0];
  return `${day}/${month}/${year}`;
}
