"use client";

import ListPage from "@/components/ui/layout/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTimeEntry } from "@/lib/api/time-entries";
import { TimeEntry } from "@/lib/models/timeEntry";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function TimeEntries() {
  const router = useRouter();
  const { token } = useAuth();
  const { timeEntries, refreshTimeEntries } = useData();
  const { openModal } = useModal();

  function handleClick(e: MouseEvent<HTMLLIElement>, id: number) {
    e.preventDefault();
    router.push(`/time-entries/${id}`);
  }

  function handleAdd(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    openModal("timeEntry", "create");
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, timeEntry: TimeEntry) {
    e.preventDefault();
    e.stopPropagation();
    openModal("timeEntry", "update", timeEntry);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const deletedTimeEntry = await deleteTimeEntry(id, token);
    if (!deletedTimeEntry) return;
    refreshTimeEntries();
  }

  return (
    <ListPage
      title="Time Entries"
      fields={[
        { label: "Task", key: "task.title" },
        { label: "Date", key: "date" },
        { label: "Duration", key: "durationMinutes" },
      ]}
      list={timeEntries}
      handleClick={handleClick}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
