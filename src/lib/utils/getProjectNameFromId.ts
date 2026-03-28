"use client";

import { useData } from "@/hooks/useData";

export default function getProjectNameFromId(id: number) {
  const { projects } = useData();
  return projects?.find((p) => p.id === id)?.name;
}
