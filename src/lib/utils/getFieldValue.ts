export default function getFieldValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}
