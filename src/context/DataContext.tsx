"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserClients } from "@/lib/api/clients";
import { getUserProjects } from "@/lib/api/projects";
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
  projects: Array<any> | null;
  clients: Array<any> | null;
  tasks: Array<any> | null;
  timeEntries: Array<any> | null;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState<Array<any> | null>(null);
  const [clients, setClients] = useState<Array<any> | null>(null);
  const [tasks, setTasks] = useState<Array<any> | null>(null);
  const [timeEntries, setTimeEntries] = useState<Array<any> | null>(null);

  useEffect(() => {
    getData();
  }, [user, token]);

  async function getData() {
    if (!user || !token) return;
    getUserProjects(user.id, token).then((data) => {
      setProjects(data?.projects);
    });
    getUserClients(user.id, token).then((data) => {
      setClients(data?.clients);
    });
    getUserTasks(user.id, token).then((data) => {
      setTasks(data?.tasks);
    });
    getUserTimeEntries(user.id, token).then((data) => {
      setTimeEntries(data?.timeEntries);
    });
  }

  async function refreshProjects() {
    if (!user || !token) return;
    getUserProjects(user.id, token).then((data) => {
      setProjects(data?.projects);
    });
  }

  async function refreshClients() {
    if (!user || !token) return;
    getUserClients(user.id, token).then((data) => {
      setClients(data?.clients);
    });
  }

  async function refreshTasks() {
    if (!user || !token) return;
    getUserTasks(user.id, token).then((data) => {
      setTasks(data?.tasks);
    });
  }

  async function refreshTimeEntries() {
    if (!user || !token) return;
    getUserTimeEntries(user.id, token).then((data) => {
      setTimeEntries(data?.timeEntries);
    });
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
