const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchAPI<T>(
  endpoint: string,
  method: string,
  token?: string,
  normalize?: (data: any) => T,
  data?: any,
): Promise<T | undefined> {
  const headers: Record<string, string> = {};
  if (data) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = token;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (res.status === 404) return;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "fetchAPI failed");
  }

  const json = await res.json();
  return normalize ? normalize(json) : json;
}
