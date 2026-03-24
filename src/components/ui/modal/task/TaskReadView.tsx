import { useData } from "@/hooks/useData";
import ModalReadContainer from "../../layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TaskReadView({ task }: { task: any }) {
  const { projects } = useData();

  return (
    <ModalReadContainer>
      <ModalReadField label="Title" value={task?.title} />
      <ModalReadField
        label="Description"
        value={task?.description || "No description set"}
      />
      <ModalReadField
        label="Project"
        value={projects?.find((p) => p.id === task.projectId).name}
      />
      <ModalReadField label="Status" value={task?.status} />
      <ModalReadField label="Priority" value={task?.priority} />
      <ModalReadField
        label="Esimated Hours"
        value={task?.estimatedHours || "No estimated hours set"}
      />
    </ModalReadContainer>
  );
}
