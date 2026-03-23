"use client";

import ProtectedRoute from "@/components/navigation/ProtectedRoute";
import DashboardCommon from "./components/DashboardCommon";
import { useAuth } from "@/hooks/useAuth";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardDeveloper from "./components/DashboardDeveloper";
import DashboardClient from "./components/DashboardClient";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <ProtectedRoute>
      <main className="text-center">
        <DashboardCommon>
          {user?.role === "admin" && <DashboardAdmin />}
          {user?.role === "developer" && <DashboardDeveloper />}
          {user?.role === "client" && <DashboardClient />}
        </DashboardCommon>
      </main>
    </ProtectedRoute>
  );
}
