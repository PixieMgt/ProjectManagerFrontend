const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "registerUser failed");
  }

  return res.json();
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "loginUser failed");
  }
  const json = await res.json();
  return json.token;
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getCurrentUser failed");
  }
  const json = await res.json();
  return json.user;
}
