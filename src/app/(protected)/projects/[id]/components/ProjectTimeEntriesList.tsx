import { useModal } from "@/hooks/useModal";
import ProjectDetailSectionCommon from "./ProjectDetailSectionCommon";
import ProjectTimeEntriesListItem from "./ProjectTimeEntriesListItem";

export default function ProjectTimeEntriesList({
  projectId,
  timeEntries,
}: {
  projectId: number;
  timeEntries: any;
}) {
  const { openModal } = useModal();

  return (
    <ProjectDetailSectionCommon
      title="Time Entries"
      addItem={() => openModal("timeEntry", "create", { projectId })}
    >
      <ul>
        {timeEntries?.length > 0 &&
          timeEntries.map((t: any, i: any) => (
            <ProjectTimeEntriesListItem key={i} timeEntry={t} />
          ))}
        {(!timeEntries || timeEntries?.length === 0) && (
          <p className="text-center">No time entries found</p>
        )}
      </ul>
    </ProjectDetailSectionCommon>
  );
}
