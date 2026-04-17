import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteProject } from "@/lib/api/calls/projects";
import { Project } from "@/lib/api/models/project";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";

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
          value={project?.startDate || "No start date set"}
        />
        <ModalReadField
          label="Deadline"
          value={project?.deadline || "No deadline set"}
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
