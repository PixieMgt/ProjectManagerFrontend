export default function ClientReadView({ client }: { client: any }) {
  return <div>{client?.name}</div>;
}
