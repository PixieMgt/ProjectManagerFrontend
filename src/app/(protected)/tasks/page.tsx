"use client";

import ListPage from "@/components/ui/layout/list/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTask } from "@/lib/api/calls/tasks";
import { Task } from "@/lib/api/models/task";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Tasks() {
  const router = useRouter();
  const { token } = useAuth();
  const { tasks, refreshTasks } = useData();
  const { openModal } = useModal();

  function handleClick(e: MouseEvent<HTMLLIElement>, id: number) {
    e.preventDefault();
    router.push(`/tasks/${id}`);
  }

  function handleAdd(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    openModal({ type: "task", mode: "create", onClose: refreshTasks });
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, task: Task) {
    e.preventDefault();
    e.stopPropagation();
    openModal({
      type: "task",
      mode: "update",
      data: task,
      onClose: refreshTasks,
    });
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, task: Task) {
    e.preventDefault();
    e.stopPropagation();
    openModal({
      type: "task",
      mode: "delete",
      data: task,
      onClose: refreshTasks,
    });
  }

  return (
    <ListPage
      title="Tasks"
      fields={[
        { label: "Title", key: "title" },
        { label: "Status", key: "status" },
        { label: "Priority", key: "priority" },
        { label: "Estimated Hours", key: "estimatedHours" },
      ]}
      list={tasks}
      handleClick={handleClick}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
