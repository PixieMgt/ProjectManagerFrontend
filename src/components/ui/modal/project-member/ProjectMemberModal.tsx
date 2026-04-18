import { ModalMode } from "@/context/ModalContext";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import {
  createProjectMember,
  deleteProjectMember,
  updateProjectMember,
} from "@/lib/api/calls/projects";
import SectionModalCommon from "../SectionModalCommon";
import ProjectMemberReadView from "./ProjectMemberReadView";
import ProjectMemberForm from "./ProjectMemberForm";
import ProjectMemberDelete from "./ProjectMemberDelete";

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
  const isDelete = mode === "delete";

  async function submitCreateProjectMember(form: any) {
    const projectMember = await createProjectMember(
      data.project.id,
      {
        userId: Number(form.userId),
        role: form.role,
      },
      token,
    );
    if (!projectMember) return;
    closeModal();
  }

  async function submitUpdateProjectMember(form: any) {
    const projectMember = await updateProjectMember(
      data.project.id,
      form.userId,
      form,
      token,
    );
    if (!projectMember) return;
    closeModal();
  }

  return (
    <SectionModalCommon
      title={isCreate ? "Add Project Member" : data?.name}
      setEditMode={() =>
        openModal({ type: "projectMember", mode: "update", data })
      }
      deleteItem={() =>
        openModal({ type: "projectMember", mode: "delete", data })
      }
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
      {isDelete && <ProjectMemberDelete member={data} />}
    </SectionModalCommon>
  );
}
