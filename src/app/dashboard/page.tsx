"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="text-center">
        <h1>Welcome {user?.name}</h1>
      </main>
    </ProtectedRoute>
  );
}
