import { useModal } from "@/hooks/useModal";
import { Project } from "@/lib/models/project";
import { Task } from "@/lib/models/task";

export default function ProjectTasksListItem({
  project,
  task,
}: {
  project: Project;
  task: Task;
}) {
  const { openModal } = useModal();

  return (
    <li
      className="flex justify-between border-2 rounded-lg p-4 mt-4 hover:cursor-pointer"
      onClick={() =>
        openModal("task", "read", {
          ...task,
          project: project,
        })
      }
    >
      <p>{task?.title}</p>
      <p>{task?.status}</p>
    </li>
  );
}
