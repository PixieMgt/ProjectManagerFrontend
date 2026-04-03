import { ProjectMember } from "../models/ProjectMember";

export function normalizeProjectMember(raw: any): ProjectMember {
  return {
    id: raw.id,
    name: raw.name,
    role: raw.role,
  };
}
