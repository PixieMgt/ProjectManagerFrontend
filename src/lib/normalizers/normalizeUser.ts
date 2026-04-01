import { User } from "../models/user";

export function normalizeUser(raw: any): User {
  return {
    id: raw.id,
    name: raw.name,
  };
}
