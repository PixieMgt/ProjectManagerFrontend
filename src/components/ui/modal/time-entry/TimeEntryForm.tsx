import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectTask from "../../input/ModalFormSelectTask";
import ModalFormSelectProject from "../../input/ModalFormSelectProject";
import normalizeTime from "@/lib/utils/normalizeTime";
import normalizeDate from "@/lib/utils/normalizeDate";
import getProjectIdFromTaskId from "@/lib/utils/getTaskProjectId";
import ModalReadField from "../../display/ModalReadField";
import getTaskTitleFromId from "@/lib/utils/getTaskTitleFromId";
import getProjectNameFromId from "@/lib/utils/getProjectNameFromId";
import { useAuth } from "@/hooks/useAuth";
import getUserNameFromId from "@/lib/utils/getUserNameFromId";

export default function TimeEntryForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const { user } = useAuth();
  const { token } = useAuth();

  const [form, setForm] = useState({
    userId: defaultValues?.userId || user.id,
    projectId:
      defaultValues?.projectId || getProjectIdFromTaskId(defaultValues?.taskId),
    taskId: defaultValues?.taskId || "",
    comment: defaultValues?.comment || "",
    date: normalizeDate(defaultValues?.date) || "",
    startTime: normalizeTime(defaultValues?.startTime) || "",
    endTime: normalizeTime(defaultValues?.endTime) || "",
    durationMinutes: defaultValues?.durationMinutes || 0,
  });
  const [assigneeName, setAssigneeName] = useState<string>("");

  useEffect(() => {
    getUserNameFromId(form?.userId, token).then((name) => {
      setAssigneeName(name);
    });
  }, []);

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
      {defaultValues?.projectId || defaultValues?.taskId ? (
        <ModalReadField
          label="Project"
          value={getProjectNameFromId(form.projectId)}
        />
      ) : (
        <ModalFormSelectProject
          name="projectId"
          label="Project"
          value={form.projectId}
          onChange={handleChange}
        />
      )}
      {defaultValues?.taskId ? (
        <ModalReadField label="Task" value={getTaskTitleFromId(form.taskId)} />
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
      <ModalReadField label="User" value={assigneeName} />
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
