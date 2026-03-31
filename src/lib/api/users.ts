const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUser(userId: number, token: string) {
  if (!userId || !token) return;
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUser failed");
  }

  const json = await res.json();

  return {
    user: json.user,
    clients: json.clients,
    projects: json.projects,
    tasks: json.tasks,
    timeEntries: json.timeEntries,
  };
}

export async function searchUserByEmail(email: string, token: string) {
  if (!email || !token) return;
  const res = await fetch(`${API_URL}/users/search?email=${email}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "searchUserByEmail failed");
  }

  const json = await res.json();

  return json.user;
}

export async function searchUserById(id: number, token: string) {
  if (!id || !token) return;
  const res = await fetch(`${API_URL}/users/search?id=${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "searchUserById failed");
  }

  const json = await res.json();

  return json.user;
}
