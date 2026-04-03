import { TimeEntry } from "../models/timeEntry";

export interface TimeEntryResponse {
  timeEntry: TimeEntry | null;
}

export interface TimeEntryListResponse {
  timeEntries: Array<TimeEntry> | null;
}
