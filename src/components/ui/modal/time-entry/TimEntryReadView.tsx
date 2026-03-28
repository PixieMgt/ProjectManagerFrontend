import { useData } from "@/hooks/useData";
import ModalReadContainer from "../../layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import normalizeDate from "@/lib/utils/normalizeDate";
import normalizeTime from "@/lib/utils/normalizeTime";
import getProjectNameFromId from "@/lib/utils/getProjectNameFromId";
import getProjectIdFromTaskId from "@/lib/utils/getTaskProjectId";
import getTaskTitleFromId from "@/lib/utils/getTaskTitleFromId";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import getUserNameFromId from "@/lib/utils/getUserNameFromId";

export default function TimeEntryReadView({ timeEntry }: { timeEntry: any }) {
  const { token } = useAuth();
  const [assigneeName, setAssigneeName] = useState<string>("");

  useEffect(() => {
    getUserNameFromId(timeEntry?.userId, token).then((name) => {
      setAssigneeName(name);
    });
  }, []);

  return (
    <ModalReadContainer>
      <ModalReadField
        label="Project"
        value={getProjectNameFromId(getProjectIdFromTaskId(timeEntry.taskId))}
      />
      <ModalReadField
        label="Task"
        value={getTaskTitleFromId(timeEntry.taskId)}
      />
      <ModalReadField
        label="Comment"
        value={timeEntry?.comment || "No comment"}
      />
      <ModalReadField label="Assignee" value={assigneeName} />
      <ModalReadField
        label="Date"
        value={normalizeDate(timeEntry?.date) || "No date set"}
      />
      <ModalReadField
        label="Start Time"
        value={normalizeTime(timeEntry?.startTime) || "No start time set"}
      />
      <ModalReadField
        label="End Time"
        value={normalizeTime(timeEntry?.endTime) || "No end time set"}
      />
    </ModalReadContainer>
  );
}
