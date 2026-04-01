import { Client } from "../models/client";
import { Project } from "../models/project";
import { Task } from "../models/task";
import { TimeEntry } from "../models/timeEntry";
import { normalizeClient } from "../normalizers/normalizeClient";
import { normalizeProject } from "../normalizers/normalizeProject";
import { normalizeTask } from "../normalizers/normalizeTask";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";
import { normalizeUser } from "../normalizers/normalizeUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUser(userId: number, token: string) {
  const result = {
    user: null,
    clients: null,
    projects: null,
    tasks: null,
    timeEntries: null,
  };

  if (!userId || !token) return result;

  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUser failed");
  }

  const json = await res.json();
  return {
    user: json.user ? normalizeUser(json.user) : null,
    clients: json.clients
      ? json.clients.map((c: Client) => normalizeClient(c))
      : null,
    projects: json.projects
      ? json.projects.map((p: Project) => normalizeProject(p))
      : null,
    tasks: json.tasks ? json.tasks.map((t: Task) => normalizeTask(t)) : null,
    timeEntries: json.timeEntries
      ? json.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
      : null,
  };
}

export async function searchUserByEmail(email: string, token: string) {
  const result = {
    user: null,
  };

  if (!email || !token) return result;

  const res = await fetch(`${API_URL}/users/search?email=${email}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "searchUserByEmail failed");
  }

  const json = await res.json();
  return {
    user: json.user ? normalizeUser(json.user) : null,
  };
}

export async function searchUserById(id: number, token: string) {
  const result = {
    user: null,
  };

  if (!id || !token) return result;

  const res = await fetch(`${API_URL}/users/search?id=${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "searchUserById failed");
  }

  const json = await res.json();
  return { user: json.user ? normalizeUser(json.user) : null };
}
