import { ModalMode } from "@/context/ModalContext";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import {
  createProjectMember,
  deleteProjectMember,
  updateProjectMember,
} from "@/lib/api/projects";
import SectionModalCommon from "../SectionModalCommon";
import ProjectMemberReadView from "./ProjectMemberReadView";
import ProjectMemberForm from "./ProjectMemberForm";

export default function ProjectMemberModal({
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

  async function submitCreateProjectMember(form: any) {
    const projectMember = await createProjectMember(
      data.projectId,
      {
        projectId: data.projectId,
        userId: Number(form.user?.id),
        role: form.role,
      },
      token,
    );
    if (!projectMember) return;
    closeModal();
  }

  async function submitUpdateProjectMember(form: any) {
    const projectMember = await updateProjectMember(
      data.projectId,
      form.userId,
      data,
      token,
    );
    if (!projectMember) return;
    closeModal();
  }

  async function handleDelete() {
    const projectMember = await deleteProjectMember(
      data.projectId,
      data.userId,
      token,
    );
    if (!projectMember) return;
    closeModal();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Project Member" : data?.name}
      setEditMode={() => openModal("projectMember", "update", data)}
      deleteItem={handleDelete}
    >
      {isRead && <ProjectMemberReadView member={data} />}
      {(isCreate || isUpdate) && (
        <ProjectMemberForm
          defaultValues={data}
          onSubmit={
            isCreate ? submitCreateProjectMember : submitUpdateProjectMember
          }
        />
      )}
    </SectionModalCommon>
  );
}
