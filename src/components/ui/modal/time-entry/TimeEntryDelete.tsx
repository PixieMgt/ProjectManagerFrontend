import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTimeEntry } from "@/lib/api/calls/time-entries";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

export default function TimeEntryDelete({
  timeEntry,
}: {
  timeEntry: TimeEntry;
}) {
  const { token } = useAuth();
  const { closeModal } = useModal();
  const { refreshTimeEntries } = useData();

  async function handleDelete() {
    const deletedTimeEntry = await deleteTimeEntry(timeEntry?.id, token);
    if (!deletedTimeEntry) return;
    closeModal();
    refreshTimeEntries();
  }

  return (
    <div className="flex flex-col">
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
      <button
        onClick={handleDelete}
        className="block mx-auto mt-8 mb-8 text-2xl text-red-500 hover:cursor-pointer"
      >
        Confirm Delete
      </button>
    </div>
  );
}
