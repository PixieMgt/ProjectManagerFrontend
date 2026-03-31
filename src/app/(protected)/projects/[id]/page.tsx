"use client";

import { useAuth } from "@/hooks/useAuth";
import { getProject } from "@/lib/api/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectDetails from "./components/ProjectDetails";
import ClientDetails from "./components/ClientDetails";
import ProjectMembersList from "./components/ProjectMembersList";
import ProjectTasksList from "./components/ProjectTasksList";
import PageHeader from "@/components/ui/layout/PageHeader";
import { Project } from "@/lib/models/project";
import { Task } from "@/lib/models/task";
import { ProjectMember } from "@/lib/models/ProjectMember";

export default function ProjectPage() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<Array<ProjectMember>>([]);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getProject(id, token);
    setProject(data?.project);
    setMembers(data?.members);
    setTasks(data?.tasks);
  }

  return (
    <>
      {project && (
        <div>
          <PageHeader title={project?.name} />
          <div className="flex flex-cols mx-8 gap-8">
            <div className="flex-1">
              <ProjectDetails project={project} />
              <ProjectMembersList
                projectId={project?.id}
                projectMembers={members}
              />
            </div>
            <div className="flex-1">
              <ClientDetails client={project?.client} />
              <ProjectTasksList project={project} tasks={tasks} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
