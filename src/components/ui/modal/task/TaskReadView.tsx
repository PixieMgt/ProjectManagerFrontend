import ModalReadContainer from "../../layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import getProjectNameFromId from "@/lib/utils/getProjectNameFromId";
import getUserNameFromId from "@/lib/utils/getUserNameFromId";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function TaskReadView({ task }: { task: any }) {
  const { token } = useAuth();
  const [assigneeName, setAssigneeName] = useState<string>("");

  useEffect(() => {
    getUserNameFromId(task?.ownerUserId, token).then((name) => {
      setAssigneeName(name);
    });
  }, []);

  return (
    <ModalReadContainer>
      <ModalReadField label="Title" value={task?.title} />
      <ModalReadField
        label="Description"
        value={task?.description || "No description set"}
      />
      <ModalReadField
        label="Project"
        value={getProjectNameFromId(task?.projectId)}
      />
      <ModalReadField label="Assignee" value={assigneeName} />
      <ModalReadField label="Status" value={task?.status} />
      <ModalReadField label="Priority" value={task?.priority} />
      <ModalReadField
        label="Esimated Hours"
        value={task?.estimatedHours || "No estimated hours set"}
      />
    </ModalReadContainer>
  );
}
