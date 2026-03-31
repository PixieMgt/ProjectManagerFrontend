import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelect from "../../input/ModalFormSelect";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import ModalReadField from "../../display/ModalReadField";
import ModalFormSelectProjectMember from "../../input/ModalFormSelectProjectMember";
import { useAuth } from "@/hooks/useAuth";

export default function TaskForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    ownerUserId: defaultValues?.owner?.id || user.id,
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    projectId: defaultValues?.project?.id || -1,
    status: defaultValues?.status || "todo",
    priority: defaultValues?.priority || "medium",
    estimatedHours: defaultValues?.estimatedHours || 0,
  });

  function handleChange(e: ChangeEvent<any>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <ModalFormContainer onSubmit={handleSubmit}>
      <ModalFormInput
        name="title"
        type="text"
        label="Title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
      />
      <ModalFormInput
        name="description"
        type="text"
        label="Description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
      />
      {defaultValues?.project?.id ? (
        <ModalReadField label="Project" value={defaultValues?.project?.name} />
      ) : (
        <ModalFormSelectProject
          name="projectId"
          label="Project"
          value={form.projectId}
          onChange={handleChange}
        />
      )}
      <ModalFormSelectProjectMember
        name="ownerUserId"
        label="Assignee"
        value={form.ownerUserId}
        onChange={handleChange}
        projectId={form.projectId}
      />
      <ModalFormSelect
        name="status"
        label="Status"
        value={form.status}
        options={["todo", "in_progress", "review", "done"]}
        onChange={handleChange}
      />
      <ModalFormSelect
        name="priority"
        label="Priority"
        value={form.priority}
        options={["low", "medium", "high", "critical"]}
        onChange={handleChange}
      />
      <ModalFormInput
        name="estimatedHours"
        type="number"
        label="Estimated Hours"
        placeholder={0}
        value={form.estimatedHours}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
