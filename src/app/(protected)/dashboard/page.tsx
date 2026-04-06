"use client";

import DashboardAdmin from "@/components/ui/layout/dashboard/DashboardAdmin";
import DashboardClient from "@/components/ui/layout/dashboard/DashboardClient";
import DashboardCommon from "@/components/ui/layout/dashboard/DashboardCommon";
import DashboardDeveloper from "@/components/ui/layout/dashboard/DashboardDeveloper";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <DashboardCommon>
      {user?.role === "admin" && <DashboardAdmin />}
      {user?.role === "developer" && <DashboardDeveloper />}
      {user?.role === "client" && <DashboardClient />}
    </DashboardCommon>
  );
}
