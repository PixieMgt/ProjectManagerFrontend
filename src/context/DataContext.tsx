"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserClients } from "@/lib/api/calls/clients";
import { getProjectMembers, getUserProjects } from "@/lib/api/calls/projects";
import { getUserTasks } from "@/lib/api/calls/tasks";
import { getUserTimeEntries } from "@/lib/api/calls/time-entries";
import { getUser } from "@/lib/api/calls/users";
import { Client } from "@/lib/api/models/client";
import { Project } from "@/lib/api/models/project";
import { Task } from "@/lib/api/models/task";
import { TimeEntry } from "@/lib/api/models/timeEntry";
import { useEffect, useState } from "react";
import { createContext } from "react";

type DataContextType = {
  getData: () => void;
  refreshClients: () => void;
  refreshProjects: () => void;
  refreshTasks: () => void;
  refreshTimeEntries: () => void;
  clients: Array<Client>;
  projects: Array<Project>;
  tasks: Array<Task>;
  timeEntries: Array<TimeEntry>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, token } = useAuth();
  const [clients, setClients] = useState<Array<Client>>([]);
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [timeEntries, setTimeEntries] = useState<Array<TimeEntry>>([]);

  useEffect(() => {
    getData();
  }, [user, token]);

  async function getData() {
    if (!user || !token) return;

    const data = await getUser(user.id, token);
    if (!data) return;

    setClients(data?.clients);
    setProjects(data?.projects);
    setTasks(data?.tasks);
    setTimeEntries(data?.timeEntries);
  }

  async function refreshProjects() {
    if (!user || !token) return;

    const { projects } = await getUserProjects(user.id, token);
    setProjects(projects);
  }

  async function refreshClients() {
    if (!user || !token) return;

    const { clients } = await getUserClients(user.id, token);
    setClients(clients);
  }

  async function refreshTasks() {
    if (!user || !token) return;

    const { tasks } = await getUserTasks(user.id, token);
    setTasks(tasks);
  }

  async function refreshTimeEntries() {
    if (!user || !token) return;

    const { timeEntries } = await getUserTimeEntries(user.id, token);
    setTimeEntries(timeEntries);
  }

  return (
    <DataContext.Provider
      value={{
        getData,
        refreshClients,
        refreshProjects,
        refreshTasks,
        refreshTimeEntries,
        clients,
        projects,
        tasks,
        timeEntries,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
