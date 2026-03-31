import { Task } from "../models/task";

export async function normalizeTask(raw: any): Promise<Task> {
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
