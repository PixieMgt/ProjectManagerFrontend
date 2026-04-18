import ModalReadContainer from "@/components/ui/modal/ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

export default function ProjectReadView({ project }: { project: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={format("string", project?.name)} />
      <ModalReadField
        label="Description"
        value={format("string", project?.description) || "No description"}
      />
      <ModalReadField
        label="Client"
        value={format("string", project?.client?.name)}
      />
      <ModalReadField
        label="Status"
        value={format("status", project?.status)}
      />
      <ModalReadField
        label="Hourly Rate"
        value={format("currency", project?.hourlyRate) || "No hourly rate set"}
      />
      <ModalReadField
        label="Start Date"
        value={format("date", project?.startDate) || "No start date set"}
      />
      <ModalReadField
        label="Deadline"
        value={format("date", project?.deadline) || "No deadline set"}
      />
    </ModalReadContainer>
  );
}
