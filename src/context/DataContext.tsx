"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserClients } from "@/lib/api/clients";
import { getProjectMembers, getUserProjects } from "@/lib/api/projects";
import { getUserTasks } from "@/lib/api/tasks";
import { getUserTimeEntries } from "@/lib/api/time-entries";
import { getUser } from "@/lib/api/users";
import { Client } from "@/lib/models/client";
import { Project } from "@/lib/models/project";
import { Task } from "@/lib/models/task";
import { TimeEntry } from "@/lib/models/timeEntry";
import { normalizeClient } from "@/lib/normalizers/normalizeClient";
import { normalizeProject } from "@/lib/normalizers/normalizeProject";
import { normalizeTask } from "@/lib/normalizers/normalizeTask";
import { normalizeTimeEntry } from "@/lib/normalizers/normalizeTimeEntry";
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

    const normalizedClients = data.clients.map((c: any) => normalizeClient(c));
    setClients(normalizedClients);

    const normalizedProjects = await Promise.all(
      data.projects.map((p: any) => normalizeProject(p)),
    );
    setProjects(normalizedProjects);

    const normalizedTasks = await Promise.all(
      data.tasks.map((t: any) => normalizeTask(t)),
    );
    setTasks(normalizedTasks);

    const normalizedTimeEntries = await Promise.all(
      data.timeEntries.map((t: any) => normalizeTimeEntry(t)),
    );
    setTimeEntries(normalizedTimeEntries);
  }

  async function refreshProjects() {
    if (!user || !token) return;

    const rawProjects = await getUserProjects(user.id, token);

    const normalizedProjects = await Promise.all(
      rawProjects.map((p: any) => normalizeProject(p)),
    );
    setProjects(normalizedProjects);
  }

  async function refreshClients() {
    if (!user || !token) return;

    const rawClients = await getUserClients(user.id, token);

    const normalizedClients = rawClients.map((c: any) => normalizeClient(c));
    setClients(normalizedClients);
  }

  async function refreshTasks() {
    if (!user || !token) return;

    const rawTasks = await getUserTasks(user.id, token);

    const normalizedTasks = await Promise.all(
      rawTasks.map((t: any) => normalizeTask(t)),
    );
    setTasks(normalizedTasks);
  }

  async function refreshTimeEntries() {
    if (!user || !token) return;

    const rawTimeEntries = await getUserTimeEntries(user.id, token);

    const normalizedTimeEntries = await Promise.all(
      rawTimeEntries.map((t: any) => normalizeTimeEntry(t)),
    );
    setTimeEntries(normalizedTimeEntries);
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
