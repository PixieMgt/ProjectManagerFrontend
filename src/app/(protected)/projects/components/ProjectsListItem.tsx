import DeleteButton from "@/components/ui/input/DeleteButton";
import EditButton from "@/components/ui/input/EditButton";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { deleteProject } from "@/lib/api/projects";
import getClientNameFromId from "@/lib/utils/getClientNameFromId";
import normalizeDate from "@/lib/utils/normalizeDate";
import { MouseEvent } from "react";

export default function ProjectsListItem({
  project,
  onClick,
}: {
  project: any;
  onClick: (e: MouseEvent<HTMLLIElement>, projectId: number) => void;
}) {
  const { token } = useAuth();
  const { openModal, closeModal } = useModal();
  const { refreshProjects } = useData();

  async function handleDelete() {
    const client = await deleteProject(project.id, token);
    if (!client) return;
    closeModal();
    refreshProjects();
  }

  return (
    <li
      className="flex items-center justify-between border-2 rounded-xl p-8 mt-4 hover:cursor-pointer"
      onClick={(e) => onClick(e, project.id)}
    >
      <h1 className="text-3xl flex-1 h-full">{project.name}</h1>
      <h2 className="text-xl flex-1">
        {getClientNameFromId(project.clientId)}
      </h2>
      <h2 className="text-xl flex-1">{project.status}</h2>
      <h2 className="text-xl flex-1">{normalizeDate(project.startDate)}</h2>
      <h2 className="text-xl flex-1">{normalizeDate(project.deadline)}</h2>
      <div className="flex flex-1 justify-end">
        <EditButton
          onClick={(e) => {
            e.stopPropagation();
            openModal("project", "update", project);
          }}
          color="white"
          className="h-10 w-10"
        />
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          color="white"
          className="h-10 w-10 ml-4"
        />
      </div>
    </li>
  );
}
