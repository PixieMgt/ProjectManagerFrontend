import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import TaskReadView from "./TaskReadView";
import TaskForm from "./TaskForm";
import { useData } from "@/hooks/useData";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { createTask, deleteTask, updateTask } from "@/lib/api/calls/tasks";
import TaskDelete from "./TaskDelete";

export default function TaskModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();

  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";

  async function submitCreateTask(form: any) {
    const task = await createTask(form, token);
    if (!task) return;
    closeModal();
  }

  async function submitUpdateTask(form: any) {
    const task = await updateTask(data.id, form, token);
    if (!task) return;
    closeModal();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Task" : data?.title}
      setEditMode={() => openModal({ type: "task", mode: "update", data })}
      deleteItem={() => openModal({ type: "task", mode: "delete", data })}
    >
      {isRead && <TaskReadView task={data} />}
      {(isCreate || isUpdate) && (
        <TaskForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateTask : submitUpdateTask}
        />
      )}
      {isDelete && <TaskDelete task={data} />}
    </SectionModalCommon>
  );
}
