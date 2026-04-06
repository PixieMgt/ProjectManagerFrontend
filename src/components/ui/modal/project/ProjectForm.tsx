import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectClient from "../../input/ModalFormSelectClient";
import ModalFormSelect from "../../input/ModalFormSelect";
import ModalFormContainer from "@/components/ui/modal/ModalFormContainer";
import ModalReadField from "../../display/ModalReadField";

export default function ProjectForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const [form, setForm] = useState({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    clientId: defaultValues?.client?.id || -1,
    status: defaultValues?.status || "planning",
    hourlyRate: defaultValues?.hourlyRate || 0,
    startDate: defaultValues?.startDate || undefined,
    deadline: defaultValues?.deadline || undefined,
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

    const clientId = form?.clientId;
    const name = form?.name?.trim();
    const description = form?.description?.trim();
    const hourlyRate = form?.hourlyRate;
    const startDate = new Date(form?.startDate).getTime();
    const deadline = new Date(form?.deadline).getTime();

    if (clientId < 0) err += "\nPlease select a client";
    if (name.length === 0) err += "\nName can't be empty";
    if (name.length > 128) err += "\nName is too long";
    if (description.length > 500) err += "\nDescription can't be empty";
    if (hourlyRate < 0) err += "\nHourly rate can't be negative";
    if (hourlyRate > 10000) err += "\nHourly rate is too high";
    if (startDate >= deadline) err += "\nDeadline must be after start date";

    return err.length > 0 ? err : null;
  }

  return (
    <ModalFormContainer errorMessage={error} onSubmit={handleSubmit}>
      <ModalFormInput
        name="name"
        type="text"
        label="Name"
        placeholder="Project Name"
        value={form.name}
        onChange={handleChange}
      />
      <ModalFormInput
        name="description"
        type="text"
        label="Description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
      />
      {defaultValues?.client?.id ? (
        <ModalReadField label="Client" value={defaultValues?.client?.name} />
      ) : (
        <ModalFormSelectClient
          name="clientId"
          label="Client"
          value={form.clientId}
          onChange={handleChange}
        />
      )}
      <ModalFormSelect
        name="status"
        label="Status"
        value={form.status}
        options={["planning", "active", "completed", "archived"]}
        onChange={handleChange}
      />
      <ModalFormInput
        name="hourlyRate"
        type="number"
        label="Hourly Rate"
        placeholder={0}
        value={form.hourlyRate}
        onChange={handleChange}
      />
      <ModalFormInput
        name="startDate"
        type="date"
        label="Start Date"
        value={form.startDate}
        onChange={handleChange}
      />
      <ModalFormInput
        name="deadline"
        type="date"
        label="Deadline"
        value={form.deadline}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
