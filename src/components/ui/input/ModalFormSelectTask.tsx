import { useData } from "@/hooks/useData";
import { ChangeEvent } from "react";

export default function ModalFormSelectTask({
  label,
  name,
  projectId,
  value,
  onChange,
}: {
  label: string;
  name: string;
  projectId: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { tasks } = useData();

  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      {projectId >= 0 ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-[75%] ml-2 border-b-1"
        >
          <option value={-1}>Select a task</option>
          {tasks &&
            tasks.map((t) => {
              if (t.projectId !== projectId) return;
              return (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              );
            })}
        </select>
      ) : (
        <p>Select a project</p>
      )}
    </div>
  );
}
