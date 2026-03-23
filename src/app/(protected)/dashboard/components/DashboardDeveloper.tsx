import SectionContainer from "@/components/ui/SectionContainer";
import { useAuth } from "@/hooks/useAuth";
import { getUserClients } from "@/lib/api/clients";
import { getUserProjects } from "@/lib/api/projects";
import { getUserTasks } from "@/lib/api/tasks";
import { getUserTimeEntries } from "@/lib/api/time-entries";
import { useEffect, useState } from "react";

export default function DashboardDeveloper() {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState<Array<any> | null>(null);
  const [clients, setClients] = useState<Array<any> | null>(null);
  const [tasks, setTasks] = useState<Array<any> | null>(null);
  const [timeEntries, setTimeEntries] = useState<Array<any> | null>(null);

  useEffect(() => {
    if (!user || !token) return;
    getUserProjects(user.id, token).then((data) => {
      setProjects(data.projects);
    });
    getUserTasks(user.id, token).then((data) => {
      setTasks(data.tasks);
    });
    getUserTimeEntries(user.id, token).then((data) => {
      setTimeEntries(data.timeEntries);
    });
    getUserClients(user.id, token).then((data) => {
      setClients(data.clients);
    });
  }, [user, token]);

  return (
    <div className="grid grid-cols-2 gap-8 m-8">
      <SectionContainer title="Projects">
        {projects ? (
          projects.map((p, i) => <p key={i}>{p.name}</p>)
        ) : (
          <p>No projects found</p>
        )}
      </SectionContainer>
      <SectionContainer title="Clients">
        {clients ? (
          clients.map((c, i) => <p key={i}>{c.name}</p>)
        ) : (
          <p>No clients found</p>
        )}
      </SectionContainer>
      <SectionContainer title="Tasks">
        {tasks ? (
          tasks.map((t, i) => <p key={i}>{t.title}</p>)
        ) : (
          <p>No tasks found</p>
        )}
      </SectionContainer>
      <SectionContainer title="Time Entries">
        {timeEntries ? (
          timeEntries.map((t, i) => <p key={i}>{t.comment}</p>)
        ) : (
          <p>No time entries found</p>
        )}
      </SectionContainer>
    </div>
  );
}
