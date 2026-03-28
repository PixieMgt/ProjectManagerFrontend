"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserClients } from "@/lib/api/clients";
import { getProjectMembers, getUserProjects } from "@/lib/api/projects";
import { getUserTasks } from "@/lib/api/tasks";
import { getUserTimeEntries } from "@/lib/api/time-entries";
import { useEffect, useState } from "react";
import { createContext } from "react";

type DataContextType = {
  getData: () => void;
  refreshProjects: () => void;
  refreshClients: () => void;
  refreshTasks: () => void;
  refreshTimeEntries: () => void;
  projects: Array<any>;
  clients: Array<any>;
  tasks: Array<any>;
  timeEntries: Array<any>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState<Array<any>>([]);
  const [clients, setClients] = useState<Array<any>>([]);
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [timeEntries, setTimeEntries] = useState<Array<any>>([]);

  useEffect(() => {
    getData();
  }, [user, token]);

  async function getData() {
    if (!user || !token) return;
    getUserProjects(user.id, token).then((p) => setProjects(p));
    getUserClients(user.id, token).then((c) => setClients(c));
    getUserTasks(user.id, token).then((t) => setTasks(t));
    getUserTimeEntries(user.id, token).then((t) => setTimeEntries(t));
  }

  async function refreshProjects() {
    if (!user || !token) return;
    getUserProjects(user.id, token).then((p) => setProjects(p));
  }

  async function refreshClients() {
    if (!user || !token) return;
    getUserClients(user.id, token).then((c) => setClients(c));
  }

  async function refreshTasks() {
    if (!user || !token) return;
    getUserTasks(user.id, token).then((t) => setTasks(t));
  }

  async function refreshTimeEntries() {
    if (!user || !token) return;
    getUserTimeEntries(user.id, token).then((t) => setTimeEntries(t));
  }

  return (
    <DataContext.Provider
      value={{
        getData,
        refreshProjects,
        refreshClients,
        refreshTasks,
        refreshTimeEntries,
        projects,
        clients,
        tasks,
        timeEntries,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
