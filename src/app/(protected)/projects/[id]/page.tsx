"use client";

import { useAuth } from "@/hooks/useAuth";
import { getProject } from "@/lib/api/calls/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "@/lib/api/models/project";
import { Task } from "@/lib/api/models/task";
import { ProjectMember } from "@/lib/api/models/ProjectMember";
import DetailsPage from "@/components/ui/layout/detail/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/detail/DetailsPageSection";
import DetailsPageSectionList from "@/components/ui/layout/detail/DetailsPageSectionList";
import DetailsField from "@/components/ui/display/DetailsField";
import { useModal } from "@/hooks/useModal";
import format from "@/lib/utils/formatting/format";

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
    const data = await getProject(id, token);
    data?.project && setProject(data?.project);
    data?.members && setMembers(data?.members);
    data?.tasks && setTasks(data?.tasks);
  }

  return (
    <>
      {project && (
        <DetailsPage title={project?.name}>
          <DetailsPageSection
            title="Project Details"
            handleEdit={() =>
              openModal({
                type: "project",
                mode: "update",
                data: project,
                onClose: getData,
              })
            }
          >
            <DetailsField
              label="Name"
              value={format("string", project?.name)}
            />
            <DetailsField
              label="Description"
              value={format("string", project?.description)}
            />
            <DetailsField
              label="Status"
              value={format("status", project?.status)}
            />
            <DetailsField
              label="Hourly Rate"
              value={format("currency", project?.hourlyRate)}
            />
            <DetailsField
              label="Start Date"
              value={format("date", project?.startDate)}
            />
            <DetailsField
              label="Deadline"
              value={format("date", project?.deadline)}
            />
          </DetailsPageSection>
          <DetailsPageSection
            title="Client Details"
            handleEdit={() =>
              openModal({
                type: "client",
                mode: "update",
                data: project?.client,
                onClose: getData,
              })
            }
          >
            <DetailsField
              label="Name"
              value={format("string", project?.client?.name)}
            />
            <DetailsField
              label="E-mail"
              value={format("string", project?.client?.email)}
            />
            <DetailsField
              label="Phone Number"
              value={format("string", project?.client?.phone)}
            />
            <DetailsField
              label="Notes"
              value={format("string", project?.client?.notes)}
            />
          </DetailsPageSection>
          <DetailsPageSectionList
            title="Members"
            fields={["name", "role"]}
            list={members}
            handleAdd={() =>
              openModal({
                type: "projectMember",
                mode: "create",
                data: { project },
                onClose: getData,
              })
            }
            handleClick={(data) =>
              openModal({
                type: "projectMember",
                mode: "read",
                data: { ...data, project },
                onClose: getData,
              })
            }
          />
          <DetailsPageSectionList
            title="Tasks"
            fields={["title", "status"]}
            list={tasks}
            handleAdd={() =>
              openModal({
                type: "task",
                mode: "create",
                data: { project },
                onClose: getData,
              })
            }
            handleClick={(data) =>
              openModal({
                type: "task",
                mode: "read",
                data: { ...data, project },
                onClose: getData,
              })
            }
          />
        </DetailsPage>
      )}
    </>
  );
}
