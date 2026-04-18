"use client";

import ListPage from "@/components/ui/layout/list/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteClient } from "@/lib/api/calls/clients";
import { Client } from "@/lib/api/models/client";
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
    openModal({ type: "client", mode: "create", onClose: refreshClients });
  }

  function handleEdit(e: MouseEvent<HTMLDivElement>, client: Client) {
    e.preventDefault();
    e.stopPropagation();
    openModal({
      type: "client",
      mode: "update",
      data: client,
      onClose: refreshClients,
    });
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, client: Client) {
    e.preventDefault();
    e.stopPropagation();
    openModal({
      type: "client",
      mode: "delete",
      data: client,
      onClose: refreshClients,
    });
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
