import { TimeEntry } from "../models/timeEntry";
import normalizeDate from "./normalizeDate";
import normalizeTime from "./normalizeTime";

export function normalizeTimeEntry(raw: any): TimeEntry {
  return {
    id: raw.id,
    project: raw.project || undefined,
    task: raw.task || undefined,
    user: raw.user || undefined,
    comment: raw.comment,
    date: normalizeDate(raw.date),
    startTime: normalizeTime(raw.startTime),
    endTime: normalizeTime(raw.endTime),
    durationMinutes: raw.durationMinutes,
  };
}
