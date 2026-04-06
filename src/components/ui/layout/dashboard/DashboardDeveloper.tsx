"use client";

import SectionContainer from "@/components/ui/layout/dashboard/SectionContainer";
import SectionContainerItem from "@/components/ui/layout/dashboard/SectionContainerItem";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";

export default function DashboardDeveloper() {
  const { projects, clients, tasks, timeEntries } = useData();

  const { openModal } = useModal();

  return (
    <div className="flex gap-8 m-8">
      <div className="flex-1">
        <SectionContainer
          title="Projects"
          onAdd={() => openModal("project", "create")}
        >
          {projects ? (
            projects.map((p) => (
              <SectionContainerItem
                key={p.id}
                item={p}
                fields={[
                  "name",
                  "client.name",
                  "status",
                  "startDate",
                  "deadline",
                ]}
                onClick={() => openModal("project", "read", p)}
              />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </SectionContainer>
        <SectionContainer
          title="Tasks"
          onAdd={() => openModal("task", "create")}
        >
          {tasks ? (
            tasks.map((t) => (
              <SectionContainerItem
                key={t.id}
                item={t}
                fields={["title", "status", "priority", "estimatedHours"]}
                onClick={() => openModal("task", "read", t)}
              />
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </SectionContainer>
      </div>
      <div className="flex-1">
        <SectionContainer
          title="Clients"
          onAdd={() => openModal("client", "create")}
        >
          {clients ? (
            clients.map((c) => (
              <SectionContainerItem
                key={c.id}
                item={c}
                fields={["name", "email", "phone"]}
                onClick={() => openModal("client", "read", c)}
              />
            ))
          ) : (
            <p>No clients found</p>
          )}
        </SectionContainer>
        <SectionContainer
          title="Time Entries"
          onAdd={() => openModal("timeEntry", "create")}
        >
          {timeEntries ? (
            timeEntries.map((te) => (
              <SectionContainerItem
                key={te.id}
                item={te}
                fields={["task.title", "date", "durationMinutes"]}
                onClick={() => openModal("timeEntry", "read", te)}
              />
            ))
          ) : (
            <p>No time entries found</p>
          )}
        </SectionContainer>
      </div>
    </div>
  );
}
