import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import TimeEntryReadView from "./TimEntryReadView";
import TimeEntryForm from "./TimeEntryForm";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { useData } from "@/hooks/useData";
import {
  createTimeEntry,
  deleteTimeEntry,
  updateTimeEntry,
} from "@/lib/api/time-entries";

export default function TimeEntryModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const { refreshTimeEntries } = useData();
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  async function submitCreateTimeEntry(form: any) {
    const timeEntry = await createTimeEntry(form, token);
    if (!timeEntry) return;
    closeModal();
    refreshTimeEntries();
  }

  async function submitUpdateTimeEntry(form: any) {
    const timeEntry = await updateTimeEntry(data.id, form, token);
    if (!timeEntry) return;
    closeModal();
    refreshTimeEntries();
  }

  async function handleDelete() {
    const timeEntry = await deleteTimeEntry(data.id, token);
    if (!timeEntry) return;
    closeModal();
    refreshTimeEntries();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Time Entry" : data?.comment}
      setEditMode={() => openModal("timeEntry", "update", data)}
      deleteItem={handleDelete}
    >
      {isRead && <TimeEntryReadView timeEntry={data} />}
      {(isCreate || isUpdate) && (
        <TimeEntryForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateTimeEntry : submitUpdateTimeEntry}
        />
      )}
    </SectionModalCommon>
  );
}
