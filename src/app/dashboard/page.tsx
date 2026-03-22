"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  async function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await logoutUser();
    setUser(null);
    router.replace("/login");
  }

  return (
    <ProtectedRoute>
      <main className="text-center">
        <h1>Welcome {user?.name}</h1>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </main>
    </ProtectedRoute>
  );
}
