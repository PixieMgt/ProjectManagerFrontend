import ModalReadContainer from "../../layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TimeEntryReadView({ timeEntry }: { timeEntry: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Project" value={timeEntry?.project?.name} />
      <ModalReadField label="Task" value={timeEntry?.task?.title} />
      <ModalReadField
        label="Comment"
        value={timeEntry?.comment || "No comment"}
      />
      <ModalReadField label="Assignee" value={timeEntry?.user?.name} />
      <ModalReadField label="Date" value={timeEntry?.date || "No date set"} />
      <ModalReadField
        label="Start Time"
        value={timeEntry?.startTime || "No start time set"}
      />
      <ModalReadField
        label="End Time"
        value={timeEntry?.endTime || "No end time set"}
      />
    </ModalReadContainer>
  );
}
