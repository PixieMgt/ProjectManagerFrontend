import { Client } from "../api/models/client";

export function normalizeClient(raw: any): Client {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    notes: raw.notes,
  };
}
