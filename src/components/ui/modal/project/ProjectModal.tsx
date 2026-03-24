import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import ProjectReadView from "./ProjectReadView";
import ProjectForm from "./ProjectForm";
import { useModal } from "@/hooks/useModal";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/api/projects";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";

export default function ProjectModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const { refreshProjects } = useData();
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";

  async function submitCreateProject(form: any) {
    const project = await createProject(form, token);
    if (!project) return;
    closeModal();
    refreshProjects();
  }

  async function submitUpdateProject(form: any) {
    const project = await updateProject(data.id, form, token);
    if (!project) return;
    closeModal();
    refreshProjects();
  }

  async function handleDelete() {
    const project = await deleteProject(data.id, token);
    if (!project) return;
    closeModal();
    refreshProjects();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Project" : data?.name}
      setEditMode={() => openModal("project", "update", data)}
      deleteItem={handleDelete}
    >
      {isRead && <ProjectReadView project={data} />}
      {(isCreate || isUpdate) && (
        <ProjectForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateProject : submitUpdateProject}
        />
      )}
    </SectionModalCommon>
  );
}
