import { Project } from "../models/project";
import normalizeDate from "./normalizeDate";

export async function normalizeProject(raw: any): Promise<Project> {
  const temp = {
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
  return temp;
}
