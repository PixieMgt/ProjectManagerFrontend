"use client";

import DetailsField from "@/components/ui/layout/DetailsField";
import DetailsPage from "@/components/ui/layout/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/DetailsPageSection";
import DetailsPageSectionList from "@/components/ui/layout/DetailsPageSectionList";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { getProject } from "@/lib/api/calls/projects";
import { getTask } from "@/lib/api/calls/tasks";
import { Client } from "@/lib/api/models/client";
import { Task } from "@/lib/api/models/task";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const { openModal } = useModal();
  const [task, setTask] = useState<Task | null>(null);
  const [timeEntries, setTimeEntries] = useState<Array<TimeEntry>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { task, timeEntries } = await getTask(id, token);
    setTask(task);
    setTimeEntries(timeEntries);
  }

  return (
    <>
      {task && (
        <DetailsPage title={task?.title}>
          <DetailsPageSection
            title="Task Details"
            handleEdit={() => openModal("task", "update", task)}
          >
            <DetailsField label="Title" value={task?.title} />
            <DetailsField label="Description" value={task?.description} />
            <DetailsField label="Status" value={task?.status} />
            <DetailsField label="Priority" value={task?.priority} />
            <DetailsField
              label="Estimated Hours"
              value={task?.estimatedHours}
            />
          </DetailsPageSection>
          <DetailsPageSection
            title="Project Details"
            handleEdit={() => openModal("project", "update", task?.project)}
          >
            <DetailsField label="Name" value={task?.project?.name} />
            <DetailsField
              label="Description"
              value={task?.project?.description}
            />
            <DetailsField label="Status" value={task?.project?.status} />
            <DetailsField
              label="Hourly Rate"
              value={task?.project?.hourlyRate}
            />
            <DetailsField label="Start Date" value={task?.project?.startDate} />
            <DetailsField label="Deadline" value={task?.project?.deadline} />
          </DetailsPageSection>
          <DetailsPageSectionList
            title="Time Entries"
            fields={["user.name", "date", "durationMinutes"]}
            list={timeEntries}
            handleAdd={() => openModal("timeEntry", "create", { task })}
            handleClick={(data) =>
              openModal("timeEntry", "read", {
                ...data,
                task,
                project: task?.project,
              })
            }
          />
        </DetailsPage>
      )}
    </>
  );
}
