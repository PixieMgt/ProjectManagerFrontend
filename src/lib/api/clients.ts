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
