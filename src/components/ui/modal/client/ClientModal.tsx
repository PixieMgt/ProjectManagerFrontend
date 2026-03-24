import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import ClientReadView from "./ClientReadView";
import ClientForm from "./ClientForm";
import { useModal } from "@/hooks/useModal";
import { createClient, deleteClient, updateClient } from "@/lib/api/clients";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";

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
  async function handleDelete() {
    const client = await deleteClient(data.id, token);
    if (!client) return;
    closeModal();
    refreshClients();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Client" : data?.name}
      setEditMode={() => openModal("client", "update", data)}
      deleteItem={handleDelete}
    >
      {isRead && <ClientReadView client={data} />}
      {(isCreate || isUpdate) && (
        <ClientForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateClient : submitUpdateClient}
        />
      )}
    </SectionModalCommon>
  );
}
