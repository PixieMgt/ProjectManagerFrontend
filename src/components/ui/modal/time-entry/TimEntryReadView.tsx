import { useData } from "@/hooks/useData";
import ModalReadContainer from "../../layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TimeEntryReadView({ timeEntry }: { timeEntry: any }) {
  const { projects, tasks } = useData();

  return (
    <ModalReadContainer>
      <ModalReadField
        label="Project"
        value={
          projects?.find(
            (p) => tasks?.find((t) => t.id === timeEntry.taskId)?.projectId,
          )?.name
        }
      />
      <ModalReadField
        label="Task"
        value={tasks?.find((t) => t.id === timeEntry.taskId).title}
      />
      <ModalReadField
        label="Comment"
        value={timeEntry?.comment || "No comment"}
      />
      <ModalReadField
        label="Date"
        value={timeEntry?.date?.split("T")[0] || "No date set"}
      />
      <ModalReadField
        label="Start Time"
        value={
          timeEntry?.startTime?.split("T")[1].slice(0, 5) || "No start time set"
        }
      />
      <ModalReadField
        label="End Time"
        value={
          timeEntry?.endTime?.split("T")[1].slice(0, 5) || "No end time set"
        }
      />
    </ModalReadContainer>
  );
}
