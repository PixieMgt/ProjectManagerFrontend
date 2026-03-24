export default function TimeEntryReadView({ timeEntry }: { timeEntry: any }) {
  return <div>{timeEntry?.comment}</div>;
}
