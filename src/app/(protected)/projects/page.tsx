"use client";

import ListPage from "@/components/ui/layout/list/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteProject } from "@/lib/api/calls/projects";
import { Project } from "@/lib/api/models/project";
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

  function handleEdit(e: MouseEvent<HTMLDivElement>, project: Project) {
    e.preventDefault();
    e.stopPropagation();
    openModal("project", "update", project);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, project: Project) {
    e.preventDefault();
    e.stopPropagation();
    openModal("project", "delete", project);
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
