import { useAuth } from "@/hooks/useAuth";
import { getProjectMembers } from "@/lib/api/projects";
import { ChangeEvent, useEffect, useState } from "react";

export default function ModalFormSelectProjectMember({
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
  const { token } = useAuth();
  const [projectMembers, setProjectMembers] = useState<Array<any>>([]);

  useEffect(() => {
    getProjectMembers(projectId, token).then((pm) => setProjectMembers(pm));
  }, []);

  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-[75%] ml-2 border-b-1"
      >
        {projectMembers &&
          projectMembers
            .filter((pm) => pm.projectId === projectId)
            .map((pm) => (
              <option key={pm.userId} value={pm.userId}>
                {pm.name}
              </option>
            ))}
      </select>
    </div>
  );
}
