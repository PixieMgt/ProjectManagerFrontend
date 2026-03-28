const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserTasks(userId: number, token: string) {
  if (!userId || !token) return;
  const res = await fetch(`${API_URL}/users/${userId}/tasks`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserTasks failed");
  }

  const json = await res.json();

  return json.tasks;
}

export async function createTask(data: any, token: string) {
  if (!data || !token) return;
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
  if (!taskId || !data || !token) return;
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

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateTask");
  }

  return res.json();
}

export async function deleteTask(taskId: number, token: string) {
  if (!taskId || !token) return;
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteTask failed");
  }

  return res.json();
}
