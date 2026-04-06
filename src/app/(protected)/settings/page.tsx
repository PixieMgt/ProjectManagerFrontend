"use client";

import PageHeader from "@/components/ui/layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/api/calls/auth";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Settings() {
  const router = useRouter();
  const { setUser } = useAuth();

  async function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await logoutUser();
    setUser(null);
    router.replace("/login");
  }

  return (
    <div>
      <PageHeader title="Settings" />
      <button
        onClick={handleLogout}
        className="block mx-auto mt-16 text-4xl hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
