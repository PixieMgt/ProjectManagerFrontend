import { Project } from "../models/project";
import { ProjectMember } from "../models/ProjectMember";
import { Task } from "../models/task";
import {
  FullProjectResponse,
  ProjectListResponse,
  ProjectMembersResponse,
} from "../responses/ProjectResponses";
import fetchAPI from "../../utils/fetchAPI";
import { normalizeProject } from "../normalizers/normalizeProject";
import { normalizeProjectMember } from "../normalizers/normalizeProjectMember";
import { normalizeTask } from "../normalizers/normalizeTask";

export async function getProject(projectId: number, token: string) {
  return await fetchAPI<FullProjectResponse>(
    `/projects/${projectId}`,
    "GET",
    token,
    (res) => ({
      project: res.project ? normalizeProject(res.project) : null,
      members: res.members
        ? res.members.map((m: ProjectMember) => normalizeProjectMember(m))
        : null,
      tasks: res.tasks ? res.tasks.map((t: Task) => normalizeTask(t)) : null,
    }),
  );
}

export async function getUserProjects(userId: number, token: string) {
  return await fetchAPI<ProjectListResponse>(
    `/users/${userId}/projects`,
    "GET",
    token,
    (res) => ({
      projects: res.projects
        ? res.projects.map((p: Project) => normalizeProject(p))
        : null,
    }),
  );
}

export async function createProject(data: any, token: string) {
  return await fetchAPI(`/projects`, "POST", token, undefined, {
    ...data,
    hourlyRate: Number(data.hourlyRate),
    clientId: Number(data.clientId),
  });
}

export async function updateProject(
  projectId: number,
  data: any,
  token: string,
) {
  return await fetchAPI(`/projects/${projectId}`, "PATCH", token, undefined, {
    ...data,
    hourlyRate: Number(data.hourlyRate),
  });
}

export async function deleteProject(projectId: number, token: string) {
  return await fetchAPI(`/projects/${projectId}`, "DELETE", token);
}

export async function getProjectMembers(projectId: number, token: string) {
  return await fetchAPI<ProjectMembersResponse>(
    `/projects/${projectId}/members`,
    "GET",
    token,
    (res) => ({
      members: res.members
        ? res.members.map((m: ProjectMember) => normalizeProjectMember(m))
        : null,
    }),
  );
}

export async function createProjectMember(
  projectId: number,
  data: any,
  token: string,
) {
  return await fetchAPI(
    `/projects/${projectId}/members`,
    "POST",
    token,
    undefined,
    data,
  );
}

export async function updateProjectMember(
  projectId: number,
  userId: number,
  data: any,
  token: string,
) {
  return await fetchAPI(
    `/projects/${projectId}/members/${userId}`,
    "PATCH",
    token,
    undefined,
    data,
  );
}

export async function deleteProjectMember(
  projectId: number,
  userId: number,
  token: string,
) {
  return await fetchAPI(
    `/projects/${projectId}/members/${userId}`,
    "DELETE",
    token,
  );
}
