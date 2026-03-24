"use client";

import { DataContext } from "@/context/DataContext";
import { useContext } from "react";

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
