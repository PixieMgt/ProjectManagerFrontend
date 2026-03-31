import { Project } from "./project";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  projects?: Array<Project>;
}
