"use client";

import ListPage from "@/components/ui/layout/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteProject } from "@/lib/api/projects";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Projects() {
  const router = useRouter();
  const { token } = useAuth();
  const { projects, refreshProjects } = useData();
  const { openModal } = useModal();

  function handleClick(e: MouseEvent<HTMLLIElement>, id: number) {
    e.preventDefault();
    router.push(`/projects/${id}`);
  }

  function handleAdd(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    openModal("project", "create");
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, data: any) {
    e.preventDefault();
    e.stopPropagation();
    openModal("project", "update", data);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const deletedProject = await deleteProject(id, token);
    if (!deletedProject) return;
    refreshProjects();
  }

  return (
    <ListPage
      title="Projects"
      fields={[
        { label: "Name", key: "name" },
        { label: "Client", key: "client.name" },
        { label: "Status", key: "status" },
        { label: "Start Date", key: "startDate" },
        { label: "Deadline", key: "deadline" },
      ]}
      list={projects}
      handleClick={handleClick}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
