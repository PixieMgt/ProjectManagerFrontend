import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteTimeEntry } from "@/lib/api/calls/time-entries";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

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
        <ModalReadField
          label="Project"
          value={format("string", timeEntry?.project?.name)}
        />
        <ModalReadField
          label="Task"
          value={format("string", timeEntry?.task?.title)}
        />
        <ModalReadField
          label="Comment"
          value={format("string", timeEntry?.comment) || "No comment"}
        />
        <ModalReadField
          label="Assignee"
          value={format("string", timeEntry?.user?.name)}
        />
        <ModalReadField
          label="Date"
          value={format("date", timeEntry?.date) || "No date set"}
        />
        <ModalReadField
          label="Start Time"
          value={format("time", timeEntry?.startTime) || "No start time set"}
        />
        <ModalReadField
          label="End Time"
          value={format("time", timeEntry?.endTime) || "No end time set"}
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
