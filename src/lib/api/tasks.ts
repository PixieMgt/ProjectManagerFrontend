import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";
import { normalizeProject } from "../normalizers/normalizeProject";
import { normalizeTask } from "../normalizers/normalizeTask";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTask(taskId: number, token: string) {
  const result = {
    task: null,
    timeEntries: null,
  };

  if (!taskId || !token) return result;
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getTask failed");
  }

  const json = await res.json();
  console.log(json);
  return {
    task: json.task ? normalizeTask(json.task) : null,
    timeEntries: json.timeEntries
      ? json.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
      : null,
  };
}

export async function getUserTasks(userId: number, token: string) {
  const result = {
    tasks: null,
  };

  if (!userId || !token) return result;

  const res = await fetch(`${API_URL}/users/${userId}/tasks`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserTasks failed");
  }

  const json = await res.json();
  return {
    tasks: json.tasks ? json.tasks.map((t: Task) => normalizeTask(t)) : null,
  };
}

export async function createTask(data: any, token: string) {
  if (!data || !token) return null;

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      estimatedHours: Number(data.estimatedHours),
      projectId: Number(data.projectId),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "createTask failed");
  }

  return res.json();
}

export async function updateTask(taskId: number, data: any, token: string) {
  if (!taskId || !data || !token) return null;

  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      ownerUserId: Number(data.ownerUserId),
      estimatedHours: Number(data.estimatedHours),
      projectId: Number(data.projectId),
    }),
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateTask");
  }

  return res.json();
}

export async function deleteTask(taskId: number, token: string) {
  if (!taskId || !token) return null;

  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteTask failed");
  }

  return res.json();
}

export async function getTaskProject(taskId: number, token: string) {
  const result = {
    project: null,
  };

  if (!taskId || !token) return result;

  const res = await fetch(`${API_URL}/tasks/${taskId}/project`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getTaskProject failed");
  }

  const json = await res.json();
  return {
    project: json.project ? normalizeProject(json.project) : null,
  };
}
