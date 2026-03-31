import normalizeDate from "@/lib/normalizers/normalizeDate";
import DetailsField from "./DetailsField";
import ProjectDetailSectionCommon from "../../../../../components/ui/layout/DetailSectionCommon";
import { useModal } from "@/hooks/useModal";

export default function ProjectDetails({ project }: { project: any }) {
  const { openModal } = useModal();

  return (
    <ProjectDetailSectionCommon
      title="Project Details"
      setEditMode={() => openModal("project", "update", project)}
    >
      <div className="flex flex-cols">
        <div className="flex-1">
          <DetailsField label="Name" value={project?.name} />
          <DetailsField label="Status" value={project?.status} />
          <DetailsField
            label="Start Date"
            value={normalizeDate(project?.startDate)}
          />
        </div>
        <div className="flex-1">
          <DetailsField label="Description" value={project?.description} />
          <DetailsField label="Hourly Rate" value={project?.hourlyRate} />
          <DetailsField
            label="Deadline"
            value={normalizeDate(project?.deadline)}
          />
        </div>
      </div>
    </ProjectDetailSectionCommon>
  );
}
