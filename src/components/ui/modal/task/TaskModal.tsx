import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import TaskReadView from "./TaskReadView";
import TaskForm from "./TaskForm";
import { useData } from "@/hooks/useData";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { createTask, deleteTask, updateTask } from "@/lib/api/tasks";

export default function TaskModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const { refreshTasks } = useData();

  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  async function submitCreateTask(form: any) {
    const task = await createTask(form, token);
    if (!task) return;
    closeModal();
    refreshTasks();
  }

  async function submitUpdateTask(form: any) {
    const task = await updateTask(data.id, form, token);
    if (!task) return;
    closeModal();
    refreshTasks();
  }

  async function handleDelete() {
    const task = await deleteTask(data.id, token);
    if (!task) return;
    closeModal();
    refreshTasks();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Task" : data?.title}
      setEditMode={() => openModal("task", "update", data)}
      deleteItem={handleDelete}
    >
      {isRead && <TaskReadView task={data} />}
      {(isCreate || isUpdate) && (
        <TaskForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateTask : submitUpdateTask}
        />
      )}
    </SectionModalCommon>
  );
}
