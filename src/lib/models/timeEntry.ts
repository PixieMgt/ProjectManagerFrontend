import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

export interface TimeEntry {
  id: number;
  project: Project;
  task: Task;
  user: User;
  comment?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
}
