import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import ClientReadView from "./ClientReadView";
import ClientForm from "./ClientForm";

export default function ClientModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  function createClient() {}
  function updateClient() {}

  return (
    <SectionModalCommon title={isCreate ? "Add Client" : data?.name}>
      {isRead && <ClientReadView client={data} />}
      {(isCreate || isUpdate) && (
        <ClientForm
          defaultValues={data}
          onSubmit={isCreate ? createClient : updateClient}
        />
      )}
    </SectionModalCommon>
  );
}
