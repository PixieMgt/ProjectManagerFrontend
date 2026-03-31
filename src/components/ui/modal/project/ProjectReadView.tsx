import ModalReadContainer from "@/components/ui/layout/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import normalizeDate from "@/lib/normalizers/normalizeDate";

export default function ProjectReadView({ project }: { project: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={project?.name} />
      <ModalReadField
        label="Description"
        value={project?.description || "No description"}
      />
      <ModalReadField label="Client" value={project?.client?.name} />
      <ModalReadField label="Status" value={project?.status} />
      <ModalReadField
        label="Hourly Rate"
        value={project?.hourlyRate || "No hourly rate set"}
      />
      <ModalReadField
        label="Start Date"
        value={normalizeDate(project?.startDate) || "No start date set"}
      />
      <ModalReadField
        label="Deadline"
        value={normalizeDate(project?.deadline) || "No deadline set"}
      />
    </ModalReadContainer>
  );
}
