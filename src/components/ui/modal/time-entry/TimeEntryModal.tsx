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
} from "@/lib/api/calls/time-entries";
import TimeEntryDelete from "./TimeEntryDelete";

export default function TimeEntryModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";

  async function submitCreateTimeEntry(form: any) {
    const timeEntry = await createTimeEntry(form, token);
    if (!timeEntry) return;
    closeModal();
  }

  async function submitUpdateTimeEntry(form: any) {
    const timeEntry = await updateTimeEntry(data.id, form, token);
    if (!timeEntry) return;
    closeModal();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Time Entry" : data?.comment}
      setEditMode={() => openModal({ type: "timeEntry", mode: "update", data })}
      deleteItem={() =>
        openModal({ type: "projectMember", mode: "delete", data })
      }
    >
      {isRead && <TimeEntryReadView timeEntry={data} />}
      {(isCreate || isUpdate) && (
        <TimeEntryForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateTimeEntry : submitUpdateTimeEntry}
        />
      )}
      {isDelete && <TimeEntryDelete timeEntry={data} />}
    </SectionModalCommon>
  );
}
