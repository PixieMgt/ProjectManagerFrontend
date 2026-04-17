import { Project } from "./project";

export interface ProjectMember {
  id: number;
  name: string;
  role: string;
  project: Project;
}
