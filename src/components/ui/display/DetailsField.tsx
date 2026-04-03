export default function DetailsField({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="border-2 rounded-lg p-4 flex m-2 items-center">
      <p className="w-[25%] text-xl">{label}</p>
      <p className="w-[75%] ml-4">{value}</p>
    </div>
  );
}
