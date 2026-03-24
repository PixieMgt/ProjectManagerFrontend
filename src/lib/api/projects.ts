const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  return res.json();
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
