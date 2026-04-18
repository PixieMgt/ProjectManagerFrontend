"use client";

import SectionContainer from "@/components/ui/layout/dashboard/SectionContainer";
import SectionContainerItem from "@/components/ui/layout/dashboard/SectionContainerItem";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";

export default function DashboardDeveloper() {
  const {
    projects,
    clients,
    tasks,
    timeEntries,
    refreshProjects,
    refreshClients,
    refreshTasks,
    refreshTimeEntries,
  } = useData();

  const { openModal } = useModal();

  return (
    <div className="flex gap-8 m-8">
      <div className="flex-1">
        <SectionContainer
          title="Projects"
          onAdd={() =>
            openModal({
              type: "project",
              mode: "create",
              onClose: refreshProjects,
            })
          }
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
                onClick={() =>
                  openModal({
                    type: "project",
                    mode: "read",
                    data: p,
                    onClose: refreshProjects,
                  })
                }
              />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </SectionContainer>
        <SectionContainer
          title="Tasks"
          onAdd={() =>
            openModal({ type: "task", mode: "create", onClose: refreshTasks })
          }
        >
          {tasks ? (
            tasks.map((t) => (
              <SectionContainerItem
                key={t.id}
                item={t}
                fields={["title", "status", "priority", "estimatedHours"]}
                onClick={() =>
                  openModal({
                    type: "task",
                    mode: "read",
                    data: t,
                    onClose: refreshTasks,
                  })
                }
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
          onAdd={() =>
            openModal({
              type: "client",
              mode: "create",
              onClose: refreshClients,
            })
          }
        >
          {clients ? (
            clients.map((c) => (
              <SectionContainerItem
                key={c.id}
                item={c}
                fields={["name", "email", "phone"]}
                onClick={() =>
                  openModal({
                    type: "client",
                    mode: "read",
                    data: c,
                    onClose: refreshClients,
                  })
                }
              />
            ))
          ) : (
            <p>No clients found</p>
          )}
        </SectionContainer>
        <SectionContainer
          title="Time Entries"
          onAdd={() =>
            openModal({
              type: "timeEntry",
              mode: "create",
              onClose: refreshTimeEntries,
            })
          }
        >
          {timeEntries ? (
            timeEntries.map((te) => (
              <SectionContainerItem
                key={te.id}
                item={te}
                fields={["task.title", "date", "durationMinutes"]}
                onClick={() =>
                  openModal({
                    type: "timeEntry",
                    mode: "read",
                    data: te,
                    onClose: refreshTimeEntries,
                  })
                }
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
