import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TaskReadView({ task }: { task: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Title" value={task?.title} />
      <ModalReadField
        label="Description"
        value={task?.description || "No description set"}
      />
      <ModalReadField label="Project" value={task?.project?.name} />
      <ModalReadField label="Assignee" value={task?.owner?.name} />
      <ModalReadField label="Status" value={task?.status} />
      <ModalReadField label="Priority" value={task?.priority} />
      <ModalReadField
        label="Esimated Hours"
        value={task?.estimatedHours || "No estimated hours set"}
      />
    </ModalReadContainer>
  );
}
