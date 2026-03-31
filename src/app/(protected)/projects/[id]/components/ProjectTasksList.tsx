import { useModal } from "@/hooks/useModal";
import ProjectDetailSectionCommon from "../../../../../components/ui/layout/DetailSectionCommon";
import ProjectTasksListItem from "./ProjectTasksListItem";
import DetailSectionCommon from "../../../../../components/ui/layout/DetailSectionCommon";
import { Task } from "@/lib/models/task";
import { Project } from "@/lib/models/project";

export default function ProjectTasksList({
  project,
  tasks,
}: {
  project: Project;
  tasks?: Array<Task>;
}) {
  const { openModal } = useModal();

  return (
    <DetailSectionCommon
      title="Tasks"
      addItem={() => openModal("task", "create", { project: project })}
    >
      <ul>
        {tasks &&
          tasks?.length > 0 &&
          tasks.map((t: any) => (
            <ProjectTasksListItem key={t.id} project={project} task={t} />
          ))}
        {(!tasks || tasks?.length === 0) && (
          <p className="text-center">No tasks found</p>
        )}
      </ul>
    </DetailSectionCommon>
  );
}
