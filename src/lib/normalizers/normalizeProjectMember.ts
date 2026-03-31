import { ProjectMember } from "../models/ProjectMember";

export async function normalizeProjectMember(raw: any): Promise<ProjectMember> {
  return {
    id: raw.id,
    name: raw.name,
    role: raw.role,
  };
}
