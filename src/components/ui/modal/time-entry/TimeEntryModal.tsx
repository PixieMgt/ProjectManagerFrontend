import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import TimeEntryReadView from "./TimEntryReadView";
import TimeEntryForm from "./TimeEntryForm";

export default function TimeEntryModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  function createTimeEntry() {}
  function updateTimeEntry() {}

  return (
    <SectionModalCommon title={isCreate ? "Add Time Entry" : data?.comment}>
      {isRead && <TimeEntryReadView timeEntry={data} />}
      {(isCreate || isUpdate) && (
        <TimeEntryForm
          defaultValues={data}
          onSubmit={isCreate ? createTimeEntry : updateTimeEntry}
        />
      )}
    </SectionModalCommon>
  );
}
