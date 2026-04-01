"use client";

import { useAuth } from "@/hooks/useAuth";
import { getProject } from "@/lib/api/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "@/lib/models/project";
import { Task } from "@/lib/models/task";
import { ProjectMember } from "@/lib/models/ProjectMember";
import DetailsPage from "@/components/ui/layout/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/DetailsPageSection";
import DetailsPageSectionList from "@/components/ui/layout/DetailsPageSectionList";
import DetailsField from "@/components/ui/layout/DetailsField";
import { useModal } from "@/hooks/useModal";

export default function ProjectPage() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const { openModal } = useModal();
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<Array<ProjectMember>>([]);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { project, members, tasks } = await getProject(id, token);
    setProject(project);
    setMembers(members);
    setTasks(tasks);
  }

  return (
    <>
      {project && (
        <DetailsPage title={project?.name}>
          <DetailsPageSection
            title="Project Details"
            handleEdit={() => openModal("project", "update", project)}
          >
            <DetailsField label="Name" value={project?.name} />
            <DetailsField label="Description" value={project?.description} />
            <DetailsField label="Status" value={project?.status} />
            <DetailsField label="Hourly Rate" value={project?.hourlyRate} />
            <DetailsField label="Start Date" value={project?.startDate} />
            <DetailsField label="Deadline" value={project?.deadline} />
          </DetailsPageSection>
          <DetailsPageSection
            title="Client Details"
            handleEdit={() => openModal("client", "update", project?.client)}
          >
            <DetailsField label="Name" value={project?.client?.name} />
            <DetailsField label="E-mail" value={project?.client?.email} />
            <DetailsField label="Phone Number" value={project?.client?.phone} />
            <DetailsField label="Notes" value={project?.client?.notes} />
          </DetailsPageSection>
          <DetailsPageSectionList
            title="Members"
            fields={["name", "role"]}
            list={members}
            handleAdd={() => openModal("projectMember", "create", { project })}
            handleClick={(data) =>
              openModal("projectMember", "read", { ...data, project })
            }
          />
          <DetailsPageSectionList
            title="Tasks"
            fields={["title", "status"]}
            list={tasks}
            handleAdd={() => openModal("task", "create", { project })}
            handleClick={(data) =>
              openModal("task", "read", { ...data, project })
            }
          />
        </DetailsPage>
      )}
    </>
  );
}
