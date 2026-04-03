import { Client } from "../models/client";
import { Project } from "../models/project";

export interface FullClientResponse {
  client: Client | null;
  projects: Array<Project> | null;
}

export interface LiteClientResponse {
  client: Client | null;
}

export interface ClientListResponse {
  clients: Array<Client> | null;
}
