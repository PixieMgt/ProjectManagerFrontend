import { Task } from "../models/task";

export function normalizeTask(raw: any): Task {
  return {
    id: raw.id,
    project: raw.project || undefined,
    owner: raw.owner,
    title: raw.title,
    description: raw.description,
    status: raw.status,
    priority: raw.priority,
    estimatedHours: raw.estimatedHours,
  };
}
