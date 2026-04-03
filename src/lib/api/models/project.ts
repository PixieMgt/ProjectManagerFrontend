import { Client } from "./client";
import { ProjectMember } from "./ProjectMember";
import { Task } from "./task";
import { TimeEntry } from "./timeEntry";
import { User } from "./user";

export interface Project {
  id: number;
  client: Client;
  owner?: User;
  name: string;
  description?: string;
  status: string;
  hourlyRate?: number;
  startDate?: string;
  deadline?: string;
  members: Array<ProjectMember>;
  tasks?: Array<Task>;
  timeEntries?: Array<TimeEntry>;
}
