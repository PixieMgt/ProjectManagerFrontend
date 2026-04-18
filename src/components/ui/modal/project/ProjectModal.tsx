import SectionModalCommon from "../SectionModalCommon";
import { ModalMode } from "@/context/ModalContext";
import ProjectReadView from "./ProjectReadView";
import ProjectForm from "./ProjectForm";
import { useModal } from "@/hooks/useModal";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/api/calls/projects";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import ProjectDelete from "./ProjectDelete";

export default function ProjectModal({
  mode,
  data,
}: {
  mode: ModalMode;
  data?: any;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const isRead = mode === "read";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";

  async function submitCreateProject(form: any) {
    const project = await createProject(form, token);
    if (!project) return;
    closeModal();
  }

  async function submitUpdateProject(form: any) {
    const project = await updateProject(data.id, form, token);
    if (!project) return;
    closeModal();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Project" : data?.name}
      setEditMode={() => openModal({ type: "project", mode: "update", data })}
      deleteItem={() => openModal({ type: "project", mode: "delete", data })}
    >
      {isRead && <ProjectReadView project={data} />}
      {(isCreate || isUpdate) && (
        <ProjectForm
          defaultValues={data}
          onSubmit={isCreate ? submitCreateProject : submitUpdateProject}
        />
      )}
      {isDelete && <ProjectDelete project={data} />}
    </SectionModalCommon>
  );
}
