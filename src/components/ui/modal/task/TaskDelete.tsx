import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTask } from "@/lib/api/calls/tasks";
import { Task } from "@/lib/api/models/task";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TaskDelete({ task }: { task: Task }) {
  const { token } = useAuth();
  const { closeModal } = useModal();
  const { refreshTasks } = useData();

  async function handleDelete() {
    const deletedTask = await deleteTask(task?.id, token);
    if (!deletedTask) return;
    closeModal();
    refreshTasks();
  }

  return (
    <div className="flex flex-col">
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
      <button
        onClick={handleDelete}
        className="block mx-auto mt-8 mb-8 text-2xl text-red-500 hover:cursor-pointer"
      >
        Confirm Delete
      </button>
    </div>
  );
}
