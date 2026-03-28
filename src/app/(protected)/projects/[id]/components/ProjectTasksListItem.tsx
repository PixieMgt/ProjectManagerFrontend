import { useModal } from "@/hooks/useModal";

export default function ProjectTasksListItem({ task }: { task: any }) {
  const { openModal } = useModal();

  return (
    <li
      className="flex justify-between border-2 rounded-lg p-4 mt-4 hover:cursor-pointer"
      onClick={() => openModal("task", "read", task)}
    >
      <p>{task?.title}</p>
      <p>{task?.status}</p>
    </li>
  );
}
