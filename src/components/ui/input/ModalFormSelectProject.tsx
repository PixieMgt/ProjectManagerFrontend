import { useData } from "@/hooks/useData";
import { ChangeEvent } from "react";

export default function ModalFormSelectProject({
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
  const { projects } = useData();

  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-[75%] ml-2 border-b-1"
      >
        <option value="">Select a project</option>
        {projects &&
          projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
      </select>
    </div>
  );
}
