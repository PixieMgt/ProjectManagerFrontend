"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  getProject,
  getProjectMembers,
  getProjectTasks,
  getProjectTimeEntries,
} from "@/lib/api/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectDetails from "./components/ProjectDetails";
import ClientDetails from "./components/ClientDetails";
import { useData } from "@/hooks/useData";
import ProjectMembersList from "./components/ProjectMembersList";
import ProjectTasksList from "./components/ProjectTasksList";
import ProjectTimeEntriesList from "./components/ProjectTimeEntriesList";

export default function Project() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const { clients } = useData();
  const [project, setProject] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [projectMembers, setProjectMembers] = useState<Array<any>>([]);
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [timeEntries, setTimeEntries] = useState<Array<any>>([]);

  useEffect(() => {
    getProject(id, token).then((p) => setProject(p));
  }, []);

  useEffect(() => {
    if (!project) return;
    setClient(clients?.find((c) => c.id === project?.clientId));
    getProjectMembers(project?.id, token).then((m) => setProjectMembers(m));
    setTasks(
      tasks?.filter((t: any) => {
        if (t.projectId !== project?.id) return;
        return t;
      }),
    );
    getProjectTasks(project?.id, token).then((t) => setTasks(t));
    getProjectTimeEntries(project?.id, token).then((te) => setTimeEntries(te));
  }, [project]);

  return (
    <div>
      <ProjectHeader name={project?.name} />
      <div className="flex flex-cols mx-8 gap-8">
        <div className="flex-1">
          <ProjectDetails project={project} />
          <ProjectMembersList
            projectId={project?.id}
            projectMembers={projectMembers}
          />
          <ProjectTimeEntriesList
            projectId={project?.id}
            timeEntries={timeEntries}
          />
        </div>
        <div className="flex-1">
          <ClientDetails client={client} />
          <ProjectTasksList projectId={project?.id} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
