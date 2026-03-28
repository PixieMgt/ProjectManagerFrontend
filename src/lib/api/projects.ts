const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProject(projectId: number, token: string) {
  if (!projectId || !token) return;
  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProject failed");
  }

  const json = await res.json();

  return json.project;
}

export async function getUserProjects(userId: number, token: string) {
  if (!userId || !token) return;
  const res = await fetch(`${API_URL}/users/${userId}/projects`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserProjects failed");
  }

  const json = await res.json();

  return json.projects;
}

export async function createProject(data: any, token: string) {
  if (!data || !token) return;
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
  if (!projectId || !data || !token) return;
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

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateProject failed");
  }

  return res.json();
}

export async function deleteProject(projectId: number, token: string) {
  if (!projectId || !token) return;
  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteProject failed");
  }

  return res.json();
}

export async function getProjectMembers(projectId: number, token: string) {
  if (!projectId || !token) return;
  const res = await fetch(`${API_URL}/projects/${projectId}/members`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProjectMembers failed");
  }

  const json = await res.json();

  return json.members;
}

export async function createProjectMember(
  projectId: number,
  data: any,
  token: string,
) {
  if (!projectId || !data || !token) return;
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
  if (!projectId || !userId || !data || !token) return;
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

  if (res.status === 404) return;

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
  if (!projectId || !userId || !token) return;
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

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteProjectMember failed");
  }

  return res.json();
}

export async function getProjectTasks(projectId: number, token: string) {
  if (!projectId || !token) return;
  const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProjectTasks failed");
  }

  const json = await res.json();

  return json.tasks;
}

export async function getProjectTimeEntries(projectId: number, token: string) {
  if (!projectId || !token) return;
  const res = await fetch(`${API_URL}/projects/${projectId}/time-entries`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getProjectTimeEntries failed");
  }

  const json = await res.json();

  return json.timeEntries;
}
