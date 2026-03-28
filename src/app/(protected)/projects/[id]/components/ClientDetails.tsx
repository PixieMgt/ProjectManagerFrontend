import { useModal } from "@/hooks/useModal";
import DetailsField from "./DetailsField";
import ProjectDetailSectionCommon from "./ProjectDetailSectionCommon";

export default function ClientDetails({ client }: { client: any }) {
  const { openModal } = useModal();

  return (
    <ProjectDetailSectionCommon
      title="Client Details"
      setEditMode={() => openModal("client", "update", client)}
    >
      <div className="flex flex-cols">
        <div className="flex-1">
          <DetailsField label="Name" value={client?.name} />
          <DetailsField label="Phone Number" value={client?.phone} />
        </div>
        <div className="flex-1">
          <DetailsField label="Notes" value={client?.notes} />
          <DetailsField label="E-mail" value={client?.email} />
        </div>
      </div>
    </ProjectDetailSectionCommon>
  );
}
