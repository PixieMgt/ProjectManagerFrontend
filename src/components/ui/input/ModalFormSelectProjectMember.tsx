import { useAuth } from "@/hooks/useAuth";
import { getProjectMembers } from "@/lib/api/calls/projects";
import { ProjectMember } from "@/lib/api/models/ProjectMember";
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
  const [projectMembers, setProjectMembers] = useState<Array<ProjectMember>>(
    [],
  );

  useEffect(() => {
    if (!projectId) return;
    getData();
  }, [projectId]);

  async function getData() {
    const data = await getProjectMembers(projectId, token);
    data?.members && setProjectMembers(data?.members);
  }

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
          {projectMembers &&
            projectMembers.map((pm) => (
              <option key={pm.id} value={pm.id}>
                {pm.name}
              </option>
            ))}
        </select>
      ) : (
        <p>Select a project</p>
      )}
    </div>
  );
}
