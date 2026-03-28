import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import getTaskTitleFromId from "@/lib/utils/getTaskTitleFromId";
import getUserNameFromId from "@/lib/utils/getUserNameFromId";
import normalizeDate from "@/lib/utils/normalizeDate";
import { useEffect, useState } from "react";

export default function ProjectTimeEntriesListItem({
  timeEntry,
}: {
  timeEntry: any;
}) {
  const { openModal } = useModal();
  const { token } = useAuth();
  const [assigneeName, setAssigneeName] = useState<string>("");

  useEffect(() => {
    getUserNameFromId(timeEntry?.userId, token).then((name) => {
      setAssigneeName(name);
    });
  }, []);

  return (
    <li
      className="flex justify-between border-2 rounded-lg p-4 mt-4 hover:cursor-pointer"
      onClick={() => openModal("timeEntry", "read", timeEntry)}
    >
      <p>{getTaskTitleFromId(timeEntry?.taskId)}</p>
      <p>{assigneeName}</p>
      <p>{normalizeDate(timeEntry?.date)}</p>
      <p>{timeEntry?.durationMinutes} minutes</p>
    </li>
  );
}
