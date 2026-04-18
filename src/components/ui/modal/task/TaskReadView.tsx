import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

export default function TaskReadView({ task }: { task: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Title" value={format("string", task?.title)} />
      <ModalReadField
        label="Description"
        value={format("string", task?.description) || "No description set"}
      />
      <ModalReadField
        label="Project"
        value={format("string", task?.project?.name)}
      />
      <ModalReadField
        label="Assignee"
        value={format("string", task?.owner?.name)}
      />
      <ModalReadField label="Status" value={format("status", task?.status)} />
      <ModalReadField
        label="Priority"
        value={format("priority", task?.priority)}
      />
      <ModalReadField
        label="Esimated Hours"
        value={
          format("hours", task?.estimatedHours) || "No estimated hours set"
        }
      />
    </ModalReadContainer>
  );
}
