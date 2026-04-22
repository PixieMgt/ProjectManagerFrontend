"use client";

import DetailsField from "@/components/ui/display/DetailsField";
import DetailsPage from "@/components/ui/layout/detail/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/detail/DetailsPageSection";
import DetailsPageSectionList from "@/components/ui/layout/detail/DetailsPageSectionList";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { getProject } from "@/lib/api/calls/projects";
import { getTask } from "@/lib/api/calls/tasks";
import { Client } from "@/lib/api/models/client";
import { Task } from "@/lib/api/models/task";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import format from "@/lib/utils/formatting/format";
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
    const data = await getTask(id, token);
    data?.task && setTask(data?.task);
    data?.timeEntries && setTimeEntries(data?.timeEntries);
  }

  return (
    <>
      {task && (
        <DetailsPage title={task?.title}>
          <DetailsPageSection
            title="Task Details"
            handleEdit={() =>
              openModal({
                type: "task",
                mode: "update",
                data: task,
                onClose: getData,
              })
            }
          >
            <DetailsField label="Title" value={format("string", task?.title)} />
            <DetailsField
              label="Description"
              value={format("string", task?.description)}
            />
            <DetailsField
              label="Status"
              value={format("status", task?.status)}
            />
            <DetailsField
              label="Priority"
              value={format("priority", task?.priority)}
            />
            <DetailsField
              label="Estimated Time"
              value={format("hours", task?.estimatedHours)}
            />
          </DetailsPageSection>
          <DetailsPageSection
            title="Project Details"
            handleEdit={() =>
              openModal({
                type: "project",
                mode: "update",
                data: task?.project,
                onClose: getData,
              })
            }
          >
            <DetailsField
              label="Name"
              value={format("string", task?.project?.name)}
            />
            <DetailsField
              label="Description"
              value={format("string", task?.project?.description)}
            />
            <DetailsField
              label="Status"
              value={format("status", task?.project?.status)}
            />
            <DetailsField
              label="Hourly Rate"
              value={format("currency", task?.project?.hourlyRate)}
            />
            <DetailsField
              label="Start Date"
              value={format("date", task?.project?.startDate)}
            />
            <DetailsField
              label="Deadline"
              value={format("date", task?.project?.deadline)}
            />
          </DetailsPageSection>
          <DetailsPageSectionList
            title="Time Entries"
            fields={["user.name", "date", "durationMinutes"]}
            list={timeEntries}
            handleAdd={() =>
              openModal({
                type: "timeEntry",
                mode: "create",
                data: { task },
                onClose: getData,
              })
            }
            handleClick={(data) =>
              openModal({
                type: "timeEntry",
                mode: "read",
                data: {
                  ...data,
                  task,
                },
                onClose: getData,
              })
            }
          />
        </DetailsPage>
      )}
    </>
  );
}
