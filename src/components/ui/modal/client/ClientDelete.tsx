import { Client } from "@/lib/api/models/client";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import { deleteClient } from "@/lib/api/calls/clients";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import format from "@/lib/utils/formatting/format";

export default function ClientDelete({ client }: { client: Client }) {
  const { token } = useAuth();
  const { closeModal } = useModal();
  const { refreshClients } = useData();

  async function handleDelete() {
    const deletedClient = await deleteClient(client?.id, token);
    if (!deletedClient) return;
    closeModal();
    refreshClients();
  }

  return (
    <div className="flex flex-col">
      <ModalReadContainer>
        <ModalReadField label="Name" value={format("string", client?.name)} />
        <ModalReadField
          label="E-mail"
          value={format("string", client?.email) || "No e-mail"}
        />
        <ModalReadField
          label="Phone Number"
          value={format("string", client?.phone) || "No phone number"}
        />
        <ModalReadField
          label="Notes"
          value={format("string", client?.notes) || "No notes"}
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
