import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import TaskReadView from "./TaskReadView";
import TaskForm from "./TaskForm";

export default function TaskModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  function createTask() {}
  function updateTask() {}

  return (
    <SectionModalCommon title={isCreate ? "Add Task" : data?.title}>
      {isRead && <TaskReadView task={data} />}
      {(isCreate || isUpdate) && (
        <TaskForm
          defaultValues={data}
          onSubmit={isCreate ? createTask : updateTask}
        />
      )}
    </SectionModalCommon>
  );
}
