"use client";

import { useData } from "@/hooks/useData";
import ProjectsListItem from "./ProjectsListItem";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import ProjectsListHeader from "./ProjectsListHeader";

export default function ProjectsList() {
  const router = useRouter();
  const { projects } = useData();

  function handleClick(e: MouseEvent<HTMLLIElement>, projectId: number) {
    e.preventDefault();
    router.push(`/projects/${projectId}`);
  }

  return (
    <ul className="m-8">
      <ProjectsListHeader />
      {projects ? (
        projects?.map((p) => (
          <ProjectsListItem key={p.id} project={p} onClick={handleClick} />
        ))
      ) : (
        <p className="text-lg text-center">No projects found</p>
      )}
    </ul>
  );
}
