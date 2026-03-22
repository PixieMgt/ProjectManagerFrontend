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
    throw new Error(message || "Registration failed");
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
    throw new Error(message || "Login failed");
  }

  return res.json();
}
