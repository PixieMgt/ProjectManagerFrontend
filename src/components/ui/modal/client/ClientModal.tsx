import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import ClientReadView from "./ClientReadView";
import ClientForm from "./ClientForm";
import { useModal } from "@/hooks/useModal";
import {
  createClient,
  deleteClient,
  updateClient,
} from "@/lib/api/calls/clients";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import ClientDelete from "./ClientDelete";

export default function ClientModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const { refreshClients } = useData();
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";

  async function submitCreateClient(form: any) {
    const client = await createClient(form, token);
    if (!client) return;
    closeModal();
    refreshClients();
  }
  async function submitUpdateClient(form: any) {
    const client = await updateClient(data.id, form, token);
    if (!client) return;
    closeModal();
    refreshClients();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Client" : data?.name}
      setEditMode={() => openModal("client", "update", data)}
      deleteItem={() => openModal("client", "delete", data)}
    >
      {isRead && <ClientReadView client={data} />}
      {(isCreate || isUpdate) && (
        <ClientForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateClient : submitUpdateClient}
        />
      )}
      {isDelete && <ClientDelete client={data} />}
    </SectionModalCommon>
  );
}
