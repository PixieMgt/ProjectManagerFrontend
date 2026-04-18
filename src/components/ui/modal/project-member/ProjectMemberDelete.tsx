import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { deleteProjectMember } from "@/lib/api/calls/projects";
import { Project } from "@/lib/api/models/project";
import { ProjectMember } from "@/lib/api/models/ProjectMember";
import ModalReadContainer from "../ModalReadContainer";
import ModalReadField from "../../display/ModalReadField";
import format from "@/lib/utils/formatting/format";

export default function ProjectMemberDelete({
  member,
}: {
  member: ProjectMember;
}) {
  const { token } = useAuth();
  const { closeModal } = useModal();

  async function handleDelete() {
    const deletedProjectMember = await deleteProjectMember(
      member?.project?.id,
      member?.id,
      token,
    );
    if (!deletedProjectMember) return;
    closeModal();
  }

  return (
    <div className="flex flex-col">
      <ModalReadContainer>
        <ModalReadField label="Name" value={format("string", member?.name)} />
        <ModalReadField label="Role" value={format("role", member?.role)} />
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
