import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";
import { LiteProjectResponse } from "../responses/ProjectResponses";
import { FullTaskResponse, TaskListResponse } from "../responses/TaskResponses";
import fetchAPI from "../../utils/fetchAPI";
import { normalizeTask } from "../normalizers/normalizeTask";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";
import { normalizeProject } from "../normalizers/normalizeProject";

export async function getTask(taskId: number, token: string) {
  return await fetchAPI<FullTaskResponse>(
    `/tasks/${taskId}`,
    "GET",
    token,
    (res) => ({
      task: res.task ? normalizeTask(res.task) : null,
      timeEntries: res.timeEntries
        ? res.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
        : null,
    }),
  );
}

export async function getUserTasks(userId: number, token: string) {
  return await fetchAPI<TaskListResponse>(
    `/users/${userId}/tasks`,
    "GET",
    token,
    (res) => ({
      tasks: res.tasks ? res.tasks.map((t: Task) => normalizeTask(t)) : null,
    }),
  );
}

export async function createTask(data: any, token: string) {
  return await fetchAPI(`/tasks`, "POST", token, undefined, {
    ...data,
    ownerUserId: Number(data.ownerUserId),
    estimatedHours: Number(data.estimatedHours),
    projectId: Number(data.projectId),
  });
}

export async function updateTask(taskId: number, data: any, token: string) {
  return await fetchAPI(`/tasks/${taskId}`, "PATCH", token, undefined, {
    ...data,
    ownerUserId: Number(data.ownerUserId),
    estimatedHours: Number(data.estimatedHours),
    projectId: Number(data.projectId),
  });
}

export async function deleteTask(taskId: number, token: string) {
  return await fetchAPI(`/tasks/${taskId}`, "DELETE", token);
}

export async function getTaskProject(taskId: number, token: string) {
  return await fetchAPI<LiteProjectResponse>(
    `/tasks/${taskId}/project`,
    "GET",
    token,
    (res) => ({
      project: res.project ? normalizeProject(res.project) : null,
    }),
  );
}
