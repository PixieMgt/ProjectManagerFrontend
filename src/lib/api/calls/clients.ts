import { Client } from "../models/client";
import { Project } from "../models/project";
import {
  ClientListResponse,
  FullClientResponse,
} from "../responses/ClientResponses";
import fetchAPI from "../../utils/fetchAPI";
import { normalizeClient } from "../normalizers/normalizeClient";
import { normalizeProject } from "../normalizers/normalizeProject";

export async function getClient(
  clientId: number,
  token: string,
): Promise<FullClientResponse | undefined> {
  return await fetchAPI<FullClientResponse>(
    `/clients/${clientId}`,
    "GET",
    token,
    (res) => ({
      client: res.client ? normalizeClient(res.client) : null,
      projects: res.projects
        ? res.projects.map((p: Project) => normalizeProject(p))
        : null,
    }),
  );
}

export async function getUserClients(
  userId: number,
  token: string,
): Promise<ClientListResponse | undefined> {
  return await fetchAPI<ClientListResponse>(
    `/users/${userId}/clients`,
    "GET",
    token,
    (res) => ({
      clients: res.clients
        ? res.clients.map((c: Client) => normalizeClient(c))
        : null,
    }),
  );
}

export async function createClient(data: any, token: string) {
  return await fetchAPI(`/clients`, "POST", token, undefined, data);
}

export async function updateClient(clientId: number, data: any, token: string) {
  return await fetchAPI(
    `/clients/${clientId}`,
    "PATCH",
    token,
    undefined,
    data,
  );
}

export async function deleteClient(clientId: number, token: string) {
  return await fetchAPI(`/clients/${clientId}`, "DELETE", token);
}
