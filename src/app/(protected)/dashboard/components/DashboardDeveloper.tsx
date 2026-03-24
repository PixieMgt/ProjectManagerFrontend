import SectionContainer from "@/components/ui/SectionContainer";
import SectionModal from "@/components/ui/modal/SectionModal";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";

export default function DashboardDeveloper() {
  const { projects, clients, tasks, timeEntries } = useData();
  const { openModal } = useModal();

  return (
    <>
      <SectionModal />
      <div className="flex gap-8 m-8">
        <div className="flex-1">
          <SectionContainer
            title="Projects"
            onAdd={() => openModal("project", "create")}
          >
            {projects ? (
              projects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => openModal("project", "read", p)}
                  className="block hover:cursor-pointer"
                >
                  {p.name}
                </button>
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
              tasks.map((t, i) => (
                <button
                  key={i}
                  onClick={() => openModal("task", "read", t)}
                  className="block hover:cursor-pointer"
                >
                  {t.title}
                </button>
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
              clients.map((c, i) => (
                <button
                  key={i}
                  onClick={() => openModal("client", "read", c)}
                  className="block hover:cursor-pointer"
                >
                  {c.name}
                </button>
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
              timeEntries.map((t, i) => (
                <button
                  key={i}
                  onClick={() => openModal("timeEntry", "read", t)}
                  className="block hover:cursor-pointer"
                >
                  {t.comment}
                </button>
              ))
            ) : (
              <p>No time entries found</p>
            )}
          </SectionContainer>
        </div>
      </div>
    </>
  );
}
