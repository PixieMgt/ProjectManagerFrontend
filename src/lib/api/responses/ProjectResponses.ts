import { Project } from "../models/project";
import { ProjectMember } from "../models/ProjectMember";
import { Task } from "../models/task";

export interface FullProjectResponse {
  project: Project | null;
  members: Array<ProjectMember> | null;
  tasks: Array<Task> | null;
}

export interface LiteProjectResponse {
  project: Project | null;
}

export interface ProjectListResponse {
  projects: Array<Project> | null;
}

export interface ProjectMembersResponse {
  members: Array<ProjectMember> | null;
}
