import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectTask from "../../input/ModalFormSelectTask";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import ModalReadField from "../../display/ModalReadField";
import { useAuth } from "@/hooks/useAuth";

export default function TimeEntryForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    userId: defaultValues?.user?.id || user.id,
    projectId: defaultValues?.project?.id || -1,
    taskId: defaultValues?.task?.id || "",
    comment: defaultValues?.comment || "",
    date: defaultValues?.date || "",
    startTime: defaultValues?.startTime || "",
    endTime: defaultValues?.endTime || "",
    durationMinutes: defaultValues?.durationMinutes || 0,
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
      {defaultValues?.project?.id || defaultValues?.taskId ? (
        <ModalReadField label="Project" value={defaultValues?.project?.name} />
      ) : (
        <ModalFormSelectProject
          name="projectId"
          label="Project"
          value={form.projectId}
          onChange={handleChange}
        />
      )}
      {defaultValues?.task?.id ? (
        <ModalReadField label="Task" value={defaultValues?.task?.title} />
      ) : (
        <ModalFormSelectTask
          name="taskId"
          label="Task"
          projectId={form.projectId}
          value={form.taskId}
          onChange={handleChange}
        />
      )}
      <ModalFormInput
        name="comment"
        type="text"
        label="Comment"
        placeholder="Comment"
        value={form.comment}
        onChange={handleChange}
      />
      <ModalReadField
        label="User"
        value={defaultValues?.user?.name || user.name}
      />
      <ModalFormInput
        name="date"
        type="date"
        label="Date"
        value={form.date}
        onChange={handleChange}
      />
      <ModalFormInput
        name="startTime"
        type="time"
        label="Start Time"
        value={form.startTime}
        onChange={handleChange}
      />
      <ModalFormInput
        name="endTime"
        type="time"
        label="End Time"
        value={form.endTime}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
