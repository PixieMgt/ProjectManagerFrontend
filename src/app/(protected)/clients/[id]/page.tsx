"use client";

import DetailsField from "@/components/ui/display/DetailsField";
import DetailsPage from "@/components/ui/layout/detail/DetailsPage";
import DetailsPageSection from "@/components/ui/layout/detail/DetailsPageSection";
import DetailsPageSectionList from "@/components/ui/layout/detail/DetailsPageSectionList";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { getClient } from "@/lib/api/calls/clients";
import { Client } from "@/lib/api/models/client";
import { Project } from "@/lib/api/models/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const params = useParams();
  const id = Number(params.id);
  const { token } = useAuth();
  const { openModal } = useModal();
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getClient(id, token);
    data?.client && setClient(data?.client);
    data?.projects && setProjects(data?.projects);
  }

  return (
    <>
      {client && (
        <DetailsPage title={client?.name}>
          <DetailsPageSection
            title="Client Details"
            handleEdit={() => openModal("client", "update", client)}
          >
            <DetailsField label="Name" value={client?.name} />
            <DetailsField label="E-mail" value={client?.email} />
            <DetailsField label="Phone Number" value={client?.phone} />
            <DetailsField label="Notes" value={client?.notes} />
          </DetailsPageSection>
          <DetailsPageSectionList
            title="Projects"
            fields={["name", "status"]}
            list={projects}
            handleAdd={() => openModal("project", "create", { client })}
            handleClick={(data) =>
              openModal("project", "read", { ...data, client })
            }
          />
        </DetailsPage>
      )}
    </>
  );
}
