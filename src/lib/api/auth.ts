import { AuthResponse } from "../responses/AuthResponses";
import { LiteUserResponse } from "../responses/UserResponses";
import fetchAPI from "../utils/fetchAPI";

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return await fetchAPI<LiteUserResponse>(
    `/auth/register`,
    "POST",
    undefined,
    undefined,
    { name, email, password },
  );
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await fetchAPI<AuthResponse>(
    `/auth/login`,
    "POST",
    undefined,
    undefined,
    { email, password },
  );
}

export async function logoutUser() {
  return await fetchAPI(`/auth/logout`, "POST");
}

export async function getCurrentUser() {
  return await fetchAPI<AuthResponse>(`/auth/me`, "GET");
}
