import { TimeEntry } from "../api/models/timeEntry";
import normalizeDate from "./normalizeDate";
import { normalizeProject } from "./normalizeProject";
import { normalizeTask } from "./normalizeTask";
import normalizeTime from "./normalizeTime";
import { normalizeUser } from "./normalizeUser";

export function normalizeTimeEntry(raw: any): TimeEntry {
  return {
    id: raw.id,
    project: (raw?.project && normalizeProject(raw.project)) || undefined,
    task: (raw?.task && normalizeTask(raw.task)) || undefined,
    user: (raw?.user && normalizeUser(raw.user)) || undefined,
    comment: raw.comment,
    date: normalizeDate(raw.date),
    startTime: normalizeTime(raw.startTime),
    endTime: normalizeTime(raw.endTime),
    durationMinutes: raw.durationMinutes,
  };
}
