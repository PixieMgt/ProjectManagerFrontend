import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectTask from "../../input/ModalFormSelectTask";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import ModalReadField from "../../display/ModalReadField";
import { useAuth } from "@/hooks/useAuth";
import timeToMinutes from "@/lib/utils/timeToMinutes";

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
    projectId: defaultValues?.task?.project?.id || -1,
    taskId: defaultValues?.task?.id || -1,
    comment: defaultValues?.comment || "",
    date: defaultValues?.date || "",
    startTime: defaultValues?.startTime || "",
    endTime: defaultValues?.endTime || "",
    durationMinutes: defaultValues?.durationMinutes || 0,
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
    const taskId = form?.taskId;
    const comment = form?.comment?.trim();
    const date = form?.date;
    const startTime = form?.startTime;
    const endTime = form?.endTime;

    if (projectId < 0) err += "\nPlease select a project";
    if (projectId > 0 && taskId < 0) err += "Please select a task";
    if (comment.length === 0) err += "\nComment can't be empty";
    if (comment.length > 500) err += "\nComment is too long";
    if (date === "") err += "\nPlease enter a date";
    if (startTime === "") err += "\nPlease enter a start time";
    if (endTime === "") err += "\nPlease enter an end time";
    if (timeToMinutes(startTime) >= timeToMinutes(endTime))
      err += "\nEnd time must be after start time";

    return err.length > 0 ? err : null;
  }

  return (
    <ModalFormContainer errorMessage={error} onSubmit={handleSubmit}>
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
        type="textLong"
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
