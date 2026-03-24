import ModalReadContainer from "@/components/ui/layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import { useData } from "@/hooks/useData";

export default function ProjectReadView({ project }: { project: any }) {
  const { clients } = useData();

  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={project?.name} />
      <ModalReadField
        label="Description"
        value={project?.description || "No description"}
      />
      <ModalReadField
        label="Client"
        value={clients?.find((c) => c.id === project.clientId).name}
      />
      <ModalReadField label="Status" value={project?.status} />
      <ModalReadField
        label="Hourly Rate"
        value={project?.hourlyRate || "No hourly rate set"}
      />
      <ModalReadField
        label="Start Date"
        value={project?.startDate?.split("T")[0] || "No start date set"}
      />
      <ModalReadField
        label="Deadline"
        value={project?.deadline?.split("T")[0] || "No deadline set"}
      />
    </ModalReadContainer>
  );
}
