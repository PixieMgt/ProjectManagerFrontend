"use client";

import { useData } from "@/hooks/useData";

export default function getClientNameFromId(id: number) {
  const { clients } = useData();
  return clients?.find((c) => c.id === id)?.name;
}
