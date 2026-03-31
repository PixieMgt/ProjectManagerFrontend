import { Project } from "./project";
import { User } from "./user";

export interface Task {
  id: number;
  project: Project;
  owner: User;
  title: string;
  description: string;
  status: string;
  priority: string;
  estimatedHours: number;
}
