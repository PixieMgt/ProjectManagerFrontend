import { Client } from "../models/client";
import { Project } from "../models/project";
import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";
import { User } from "../models/user";

export interface FullUserResponse {
  user: User | null;
  clients: Array<Client> | null;
  projects: Array<Project> | null;
  tasks: Array<Task> | null;
  timeEntries: Array<TimeEntry> | null;
}

export interface LiteUserResponse {
  user: User | null;
}
