import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";

export interface FullTaskResponse {
  task: Task | null;
  timeEntries: Array<TimeEntry> | null;
}

export interface LiteTaskResponse {
  task: Task | null;
}

export interface TaskListResponse {
  tasks: Array<Task> | null;
}
