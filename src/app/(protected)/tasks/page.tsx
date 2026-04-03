"use client";

import ListPage from "@/components/ui/layout/ListPage";
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
    openModal("task", "create");
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, task: Task) {
    e.preventDefault();
    e.stopPropagation();
    openModal("task", "update", task);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const deletedTask = await deleteTask(id, token);
    if (!deletedTask) return;
    refreshTasks();
  }

  return (
    <ListPage
      title="Tasks"
      fields={[
        { label: "Title", key: "title" },
        { label: "Status", key: "status" },
      ]}
      list={tasks}
      handleClick={handleClick}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
