import { useModal } from "@/hooks/useModal";
import ProjectDetailSectionCommon from "../../../../../components/ui/layout/DetailSectionCommon";
import ProjectMembersListItem from "./ProjectMembersListItem";

export default function ProjectMembersList({
  projectId,
  projectMembers,
}: {
  projectId: number;
  projectMembers: any;
}) {
  const { openModal } = useModal();

  return (
    <ProjectDetailSectionCommon
      title="Members"
      addItem={() => openModal("projectMember", "create", { projectId })}
    >
      <ul>
        {projectMembers?.length > 0 &&
          projectMembers.map((pm: any) => (
            <ProjectMembersListItem key={pm.id} projectMember={pm} />
          ))}
      </ul>
    </ProjectDetailSectionCommon>
  );
}
