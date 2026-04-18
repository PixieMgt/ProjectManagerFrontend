import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTask } from "@/lib/api/calls/tasks";
import { Task } from "@/lib/api/models/task";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

export default function TaskDelete({ task }: { task: Task }) {
  const { token } = useAuth();
  const { closeModal } = useModal();

  async function handleDelete() {
    const deletedTask = await deleteTask(task?.id, token);
    if (!deletedTask) return;
    closeModal();
  }

  return (
    <div className="flex flex-col">
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
      <button
        onClick={handleDelete}
        className="block mx-auto mt-8 mb-8 text-2xl text-red-500 hover:cursor-pointer"
      >
        Confirm Delete
      </button>
    </div>
  );
}
