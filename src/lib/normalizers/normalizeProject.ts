import { Project } from "../models/project";
import normalizeDate from "./normalizeDate";

export function normalizeProject(raw: any): Project {
  return {
    id: raw.id,
    client: raw.client,
    name: raw.name,
    description: raw.description,
    status: raw.status,
    hourlyRate: raw.hourlyRate,
    startDate: normalizeDate(raw.startDate),
    deadline: normalizeDate(raw.deadline),
    members: raw.members,
  };
}
