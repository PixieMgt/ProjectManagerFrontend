import { useModal } from "@/hooks/useModal";

export default function ProjectMembersListItem({
  projectMember,
}: {
  projectMember: any;
}) {
  const { openModal } = useModal();

  return (
    <li
      className="flex justify-between border-2 rounded-lg p-4 mt-4 hover:cursor-pointer"
      onClick={() => openModal("projectMember", "read", projectMember)}
    >
      <p>{projectMember?.name}</p>
      <p>{projectMember?.role}</p>
    </li>
  );
}
