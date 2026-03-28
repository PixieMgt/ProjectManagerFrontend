export default function DetailsField({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      <p className="w-[75%] ml-2">{value}</p>
    </div>
  );
}
