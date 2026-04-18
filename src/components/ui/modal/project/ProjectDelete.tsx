import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteProject } from "@/lib/api/calls/projects";
import { Project } from "@/lib/api/models/project";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

export default function ProjectDelete({ project }: { project: Project }) {
  const { token } = useAuth();
  const { closeModal } = useModal();
  const { refreshProjects } = useData();

  async function handleDelete() {
    const deletedProject = await deleteProject(project?.id, token);
    if (!deletedProject) return;
    closeModal();
    refreshProjects();
  }

  return (
    <div className="flex flex-col">
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
          value={
            format("currency", project?.hourlyRate) || "No hourly rate set"
          }
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
      <button
        onClick={handleDelete}
        className="block mx-auto mt-8 mb-8 text-2xl text-red-500 hover:cursor-pointer"
      >
        Confirm Delete
      </button>
    </div>
  );
}
