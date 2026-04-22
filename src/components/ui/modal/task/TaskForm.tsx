import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../ModalFormContainer";
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
    projectId: defaultValues?.project?.id || -1,
    ownerUserId: defaultValues?.owner?.id || user.id,
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    status: defaultValues?.status || "todo",
    priority: defaultValues?.priority || "medium",
    estimatedHours: defaultValues?.estimatedHours || 0,
  });
  const [error, setError] = useState<string>("");

  function handleChange(e: ChangeEvent<any>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const error = validateInputs();
    if (error) {
      setError(error);
      return;
    }
    onSubmit(form);
  }

  function validateInputs() {
    let err = "";

    const projectId = form?.projectId;
    const userId = form?.ownerUserId;
    const title = form?.title?.trim();
    const description = form?.description?.trim();
    const status = form?.status;
    const priority = form?.priority;
    const estimatedHours = form?.estimatedHours;

    if (projectId < 0) err += "\nPlease select a project";
    if (title.length === 0) err += "\nTitle can't be empty";
    if (title.length > 128) err += "\nTitle is too long";
    if (description.length > 500) err += "\nDescription is too long";
    if (estimatedHours < 0) err += "\nEstimated hours can't be negative";
    if (estimatedHours > 10000) err += "\nEstimated hours is too high";

    return err.length > 0 ? err : null;
  }

  return (
    <ModalFormContainer errorMessage={error} onSubmit={handleSubmit}>
      <ModalFormInput
        name="title"
        type="textShort"
        label="Title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
      />
      <ModalFormInput
        name="description"
        type="textLong"
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
