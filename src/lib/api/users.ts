import { Client } from "../models/client";
import { Project } from "../models/project";
import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";
import { normalizeClient } from "../normalizers/normalizeClient";
import { normalizeProject } from "../normalizers/normalizeProject";
import { normalizeTask } from "../normalizers/normalizeTask";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";
import { normalizeUser } from "../normalizers/normalizeUser";
import { FullUserResponse, LiteUserResponse } from "../responses/UserResponses";
import fetchAPI from "../utils/fetchAPI";

export async function getUser(userId: number, token: string) {
  return await fetchAPI<FullUserResponse>(
    `/users/${userId}`,
    "GET",
    token,
    (res) => ({
      user: res.user ? normalizeUser(res.user) : null,
      clients: res.clients
        ? res.clients.map((c: Client) => normalizeClient(c))
        : null,
      projects: res.projects
        ? res.projects.map((p: Project) => normalizeProject(p))
        : null,
      tasks: res.tasks ? res.tasks.map((t: Task) => normalizeTask(t)) : null,
      timeEntries: res.timeEntries
        ? res.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
        : null,
    }),
  );
}

export async function searchUserByEmail(email: string, token: string) {
  return await fetchAPI<LiteUserResponse>(
    `/users/search?email=${email}`,
    "GET",
    token,
    (res) => ({
      user: res.user ? normalizeUser(res.user) : null,
    }),
  );
}

export async function searchUserById(id: number, token: string) {
  return await fetchAPI<LiteUserResponse>(
    `/users/search?id=${id}`,
    "GET",
    token,
    (res) => ({
      user: res.user ? normalizeUser(res.user) : null,
    }),
  );
}
