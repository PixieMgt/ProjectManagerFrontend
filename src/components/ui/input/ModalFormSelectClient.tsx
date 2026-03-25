import { useData } from "@/hooks/useData";
import { ChangeEvent } from "react";

export default function ModalFormSelectClient({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { clients } = useData();

  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-[75%] ml-2 border-b-1"
      >
        <option value={-1}>Select a client</option>
        {clients &&
          clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
    </div>
  );
}
