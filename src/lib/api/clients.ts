const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserClients(userId: number, token: string) {
  if (!userId || !token) return;
  const res = await fetch(`${API_URL}/users/${userId}/clients`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserClients failed");
  }

  return res.json();
}

export async function createClient(data: any, token: string) {
  if (!data || !token) return;
  const res = await fetch(`${API_URL}/clients`, {
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
    throw new Error(message || "createClient failed");
  }

  return res.json();
}

export async function updateClient(clientId: number, data: any, token: string) {
  if (!clientId || !data || !token) return;
  const res = await fetch(`${API_URL}/clients/${clientId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateClient failed");
  }

  return res.json();
}

export async function deleteClient(clientId: number, token: string) {
  if (!clientId || !token) return;
  const res = await fetch(`${API_URL}/clients/${clientId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteClient failed");
  }

  return res.json();
}
