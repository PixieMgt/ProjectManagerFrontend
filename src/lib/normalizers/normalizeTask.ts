import { Task } from "../models/task";
import { normalizeProject } from "./normalizeProject";
import { normalizeUser } from "./normalizeUser";

export function normalizeTask(raw: any): Task {
  return {
    id: raw.id,
    project: (raw?.project && normalizeProject(raw.project)) || undefined,
    owner: raw?.owner && normalizeUser(raw.owner),
    title: raw.title,
    description: raw.description,
    status: raw.status,
    priority: raw.priority,
    estimatedHours: raw.estimatedHours || raw.estimated_hours,
  };
}
