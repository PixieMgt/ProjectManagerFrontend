import { useModal } from "@/hooks/useModal";
import ProjectDetailSectionCommon from "./ProjectDetailSectionCommon";
import ProjectTasksListItem from "./ProjectTasksListItem";

export default function ProjectTasksList({
  projectId,
  tasks,
}: {
  projectId: number;
  tasks: any;
}) {
  const { openModal } = useModal();

  return (
    <ProjectDetailSectionCommon
      title="Tasks"
      addItem={() => openModal("task", "create", { projectId })}
    >
      <ul>
        {tasks?.length > 0 &&
          tasks.map((t: any) => <ProjectTasksListItem key={t.id} task={t} />)}
        {(!tasks || tasks?.length === 0) && (
          <p className="text-center">No tasks found</p>
        )}
      </ul>
    </ProjectDetailSectionCommon>
  );
}
