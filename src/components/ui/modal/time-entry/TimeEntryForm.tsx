import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectTask from "../../input/ModalFormSelectTask";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import { useData } from "@/hooks/useData";

export default function TimeEntryForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const { tasks } = useData();

  const [form, setForm] = useState({
    projectId: tasks?.find((t) => t.id === defaultValues?.taskId)?.projectId,
    taskId: defaultValues?.taskId || "",
    comment: defaultValues?.comment || "",
    date: defaultValues?.date?.split("T")[0] || "",
    startTime: defaultValues?.startTime?.split("T")[1].slice(0, 5) || "",
    endTime: defaultValues?.endTime?.split("T")[1].slice(0, 5) || "",
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
      <ModalFormSelectProject
        name="projectId"
        label="Project"
        value={form.projectId}
        onChange={handleChange}
      />
      <ModalFormSelectTask
        name="taskId"
        label="Task"
        projectId={form.projectId}
        value={form.taskId}
        onChange={handleChange}
      />
      <ModalFormInput
        name="comment"
        type="text"
        label="Comment"
        placeholder="Comment"
        value={form.comment}
        onChange={handleChange}
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
