import AddButton from "@/components/ui/input/AddButton";
import { useModal } from "@/hooks/useModal";

export default function ProjectsListHeader() {
  const { openModal } = useModal();

  return (
    <div className="flex justify-between items-center px-8">
      <h1 className="flex-1">Title</h1>
      <h1 className="flex-1">Client</h1>
      <h1 className="flex-1">Status</h1>
      <h1 className="flex-1">Start Date</h1>
      <h1 className="flex-1">Deadline</h1>
      <div className="flex-1">
        <AddButton
          onClick={() => openModal("project", "create")}
          color="white"
          className="h-10 w-10 ml-auto"
        />
      </div>
    </div>
  );
}
