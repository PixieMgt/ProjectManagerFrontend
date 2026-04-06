import Link from "next/link";
import { useRouter } from "next/navigation";
import SettingsButton from "../input/SettingsButton";
import { useData } from "@/hooks/useData";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  const { currentPage } = useData();

  return (
    <div className="w-[50vw] mx-auto mt-8 p-4 border-2 rounded-xl border-white">
      <div className="grid grid-cols-[1fr_8fr_1fr] w-full items-center">
        <div />
        <h1 className="text-4xl text-center">{title}</h1>
        <div className="flex justify-end">
          <SettingsButton
            onClick={() => router.push("/settings")}
            color="white"
            className="w-10 h-10"
          />
        </div>
      </div>
      <div className="w-[75%] mx-auto flex justify-between mt-4 text-xl">
        <Link
          href={"/dashboard"}
          className={currentPage === "dashboard" ? "border-b-1" : ""}
        >
          Dashboard
        </Link>
        <Link
          href={"/projects"}
          className={currentPage === "projects" ? "border-b-1" : ""}
        >
          Projects
        </Link>
        <Link
          href={"/clients"}
          className={currentPage === "clients" ? "border-b-1" : ""}
        >
          Clients
        </Link>
        <Link
          href={"/tasks"}
          className={currentPage === "tasks" ? "border-b-1" : ""}
        >
          Tasks
        </Link>
        <Link
          href={"/time-entries"}
          style={{ whiteSpace: "nowrap" }}
          className={currentPage === "time-entries" ? "border-b-1" : ""}
        >
          Time Entries
        </Link>
      </div>
    </div>
  );
}
