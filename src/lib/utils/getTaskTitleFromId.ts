"use client";

import { useData } from "@/hooks/useData";

export default function getTaskTitleFromId(id: number) {
  const { tasks } = useData();
  return tasks?.find((t) => t.id === id)?.title;
}
