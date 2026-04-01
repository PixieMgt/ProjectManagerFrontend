"use client";

import ListPage from "@/components/ui/layout/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteClient } from "@/lib/api/clients";
import { Client } from "@/lib/models/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Clients() {
  const router = useRouter();
  const { token } = useAuth();
  const { clients, refreshClients } = useData();
  const { openModal } = useModal();

  function handleClick(e: MouseEvent<HTMLLIElement>, id: number) {
    e.preventDefault();
    router.push(`/clients/${id}`);
  }

  function handleAdd(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    openModal("client", "create");
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, client: Client) {
    e.preventDefault();
    e.stopPropagation();
    openModal("client", "update", client);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const deletedClient = await deleteClient(id, token);
    if (!deletedClient) return;
    refreshClients();
  }

  return (
    <ListPage
      title="Clients"
      fields={[
        { label: "Name", key: "name" },
        { label: "E-mail", key: "email" },
        { label: "Phone Number", key: "phone" },
      ]}
      list={clients}
      handleClick={handleClick}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
