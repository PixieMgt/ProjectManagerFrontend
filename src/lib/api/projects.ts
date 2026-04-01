import { Project } from "../models/project";
import { ProjectMember } from "../models/ProjectMember";
import { Task } from "../models/task";
import { normalizeProject } from "../normalizers/normalizeProject";
import { normalizeProjectMember } from "../normalizers/normalizeProjectMember";
import { normalizeTask } from "../normalizers/normalizeTask";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProject(projectId: number, token: string) {
  const result = {
    project: null,
    members: null,
    tasks: null,
  };

  if (!projectId || !token) return result;

  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProject failed");
  }

  const json = await res.json();
  return {
    project: json.project ? normalizeProject(json.project) : null,
    members: json.members
      ? json.members.map((m: ProjectMember) => normalizeProjectMember(m))
      : null,
    tasks: json.tasks ? json.tasks.map((t: Task) => normalizeTask(t)) : null,
  };
}

export async function getUserProjects(userId: number, token: string) {
  const result = {
    projects: null,
  };

  if (!userId || !token) return result;

  const res = await fetch(`${API_URL}/users/${userId}/projects`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserProjects failed");
  }

  const json = await res.json();
  return {
    projects: json.projects
      ? json.projects.map((p: Project) => normalizeProject(p))
      : null,
  };
}

export async function createProject(data: any, token: string) {
  if (!data || !token) return null;

  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      hourlyRate: Number(data.hourlyRate),
      clientId: Number(data.clientId),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "createProject failed");
  }

  return res.json();
}

export async function updateProject(
  projectId: number,
  data: any,
  token: string,
) {
  if (!projectId || !data || !token) return null;

  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      hourlyRate: Number(data.hourlyRate),
    }),
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateProject failed");
  }

  return res.json();
}

export async function deleteProject(projectId: number, token: string) {
  if (!projectId || !token) return null;

  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteProject failed");
  }

  return res.json();
}

export async function getProjectMembers(projectId: number, token: string) {
  const result = {
    members: null,
  };

  if (!projectId || !token) return result;

  const res = await fetch(`${API_URL}/projects/${projectId}/members`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProjectMembers failed");
  }

  const json = await res.json();
  return {
    members: json.members
      ? json.members.map((m: ProjectMember) => normalizeProjectMember(m))
      : null,
  };
}

export async function createProjectMember(
  projectId: number,
  data: any,
  token: string,
) {
  if (!projectId || !data || !token) return null;

  const res = await fetch(`${API_URL}/projects/${projectId}/members`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "createProjectMember failed");
  }

  return res.json();
}

export async function updateProjectMember(
  projectId: number,
  userId: number,
  data: any,
  token: string,
) {
  if (!projectId || !userId || !data || !token) return null;

  const res = await fetch(
    `${API_URL}/projects/${projectId}/members/${userId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateProjectMember failed");
  }

  return res.json();
}

export async function deleteProjectMember(
  projectId: number,
  userId: number,
  token: string,
) {
  if (!projectId || !userId || !token) return null;

  const res = await fetch(
    `${API_URL}/projects/${projectId}/members/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: token,
      },
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteProjectMember failed");
  }

  return res.json();
}
