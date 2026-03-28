"use client";

import { useData } from "@/hooks/useData";

export default function getProjectIdFromTaskId(id: number) {
  const { tasks } = useData();
  return tasks?.find((t) => t.id === id)?.projectId;
}
