import { Project } from "../models/project";
import { ProjectMember } from "../models/ProjectMember";
import { normalizeClient } from "./normalizeClient";
import normalizeDate from "./normalizeDate";
import { normalizeProjectMember } from "./normalizeProjectMember";

export function normalizeProject(raw: any): Project {
  return {
    id: raw.id,
    client: raw?.client && normalizeClient(raw.client),
    name: raw.name,
    description: raw.description,
    status: raw.status,
    hourlyRate: raw.hourlyRate || raw.hourly_rate,
    startDate: normalizeDate(raw.startDate || raw.start_date),
    deadline: normalizeDate(raw.deadline),
    members:
      raw?.members &&
      raw.members.map((m: ProjectMember) => normalizeProjectMember(m)),
  };
}
