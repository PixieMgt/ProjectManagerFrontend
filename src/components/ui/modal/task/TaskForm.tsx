import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelect from "../../input/ModalFormSelect";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import ModalReadField from "../../display/ModalReadField";
import getProjectNameFromId from "@/lib/utils/getProjectNameFromId";
import { useAuth } from "@/hooks/useAuth";
import ModalFormSelectProjectMember from "../../input/ModalFormSelectProjectMember";

export default function TaskForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    ownerUserId: defaultValues?.ownerUserId || user?.id,
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    projectId: defaultValues?.projectId || "",
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
      {defaultValues?.projectId ? (
        <ModalReadField
          label="Project"
          value={getProjectNameFromId(defaultValues?.projectId)}
        />
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
