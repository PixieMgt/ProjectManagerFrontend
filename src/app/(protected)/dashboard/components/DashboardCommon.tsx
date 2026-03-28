import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function DashboardCommon({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser } = useAuth();
  const router = useRouter();

  async function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await logoutUser();
    setUser(null);
    router.replace("/login");
  }

  return (
    <>
      <div className="w-[50vw] mx-auto mt-8 p-4 border-2 rounded-xl border-white">
        <h1 className="text-4xl">Welcome {user?.name}</h1>
        <div>
          <Link href={"/projects"} className="underline">
            Projects
          </Link>
          <Link href={"/clients"} className="ml-4 underline">
            Clients
          </Link>
          <Link href={"/tasks"} className="ml-4 underline">
            Tasks
          </Link>
          <Link href={"/time-entries"} className="ml-4 underline">
            Time Entries
          </Link>
        </div>
        <button
          onClick={(e) => handleLogout(e)}
          className="underline hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
      {children}
    </>
  );
}
