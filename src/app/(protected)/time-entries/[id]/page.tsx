"use client";

import DetailsField from "@/components/ui/layout/DetailsField";
import DetailsPage from "@/components/ui/layout/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/DetailsPageSection";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { getTimeEntry } from "@/lib/api/calls/time-entries";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TimeEntryPage() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const { openModal } = useModal();
  const [timeEntry, setTimeEntry] = useState<TimeEntry | null>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { timeEntry } = await getTimeEntry(id, token);
    setTimeEntry(timeEntry);
  }

  return (
    <>
      {timeEntry && (
        <DetailsPage title={timeEntry?.task?.title}>
          <DetailsPageSection
            title="Time Entry Details"
            handleEdit={() => openModal("timeEntry", "update", timeEntry)}
          >
            <DetailsField label="Task" value={timeEntry?.task?.title} />
            <DetailsField label="User" value={timeEntry?.user?.name} />
            <DetailsField label="Comment" value={timeEntry?.comment} />
            <DetailsField label="Date" value={timeEntry?.date} />
            <DetailsField label="Start Time" value={timeEntry?.startTime} />
            <DetailsField label="End Time" value={timeEntry?.endTime} />
            <DetailsField label="Duration" value={timeEntry?.durationMinutes} />
          </DetailsPageSection>
          <DetailsPageSection
            title="Task Details"
            handleEdit={() =>
              openModal("task", "update", {
                ...timeEntry?.task,
                project: timeEntry.project,
              })
            }
          >
            <DetailsField label="Title" value={timeEntry?.task?.title} />
            <DetailsField
              label="Description"
              value={timeEntry?.task?.description}
            />
            <DetailsField label="Status" value={timeEntry?.task?.status} />
            <DetailsField label="Priority" value={timeEntry?.task?.priority} />
            <DetailsField
              label="Estimated Hours"
              value={timeEntry?.task?.estimatedHours}
            />
          </DetailsPageSection>
        </DetailsPage>
      )}
    </>
  );
}
