"use client";

import DetailsField from "@/components/ui/display/DetailsField";
import DetailsPage from "@/components/ui/layout/detail/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/detail/DetailsPageSection";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { getTimeEntry } from "@/lib/api/calls/time-entries";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import format from "@/lib/utils/formatting/format";
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
    const data = await getTimeEntry(id, token);
    data?.timeEntry && setTimeEntry(data?.timeEntry);
  }

  return (
    <>
      {timeEntry && (
        <DetailsPage title={timeEntry?.task?.title}>
          <DetailsPageSection
            title="Time Entry Details"
            handleEdit={() => openModal("timeEntry", "update", timeEntry)}
          >
            <DetailsField
              label="Task"
              value={format("string", timeEntry?.task?.title)}
            />
            <DetailsField
              label="User"
              value={format("string", timeEntry?.user?.name)}
            />
            <DetailsField
              label="Comment"
              value={format("string", timeEntry?.comment)}
            />
            <DetailsField
              label="Date"
              value={format("date", timeEntry?.date)}
            />
            <DetailsField
              label="Start Time"
              value={format("time", timeEntry?.startTime)}
            />
            <DetailsField
              label="End Time"
              value={format("time", timeEntry?.endTime)}
            />
            <DetailsField
              label="Duration"
              value={format("minutes", timeEntry?.durationMinutes)}
            />
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
            <DetailsField
              label="Title"
              value={format("string", timeEntry?.task?.title)}
            />
            <DetailsField
              label="Description"
              value={format("string", timeEntry?.task?.description)}
            />
            <DetailsField
              label="Status"
              value={format("status", timeEntry?.task?.status)}
            />
            <DetailsField
              label="Priority"
              value={format("priority", timeEntry?.task?.priority)}
            />
            <DetailsField
              label="Estimated Time"
              value={format("hours", timeEntry?.task?.estimatedHours)}
            />
          </DetailsPageSection>
        </DetailsPage>
      )}
    </>
  );
}
