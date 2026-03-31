import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormInput from "../../input/ModalFormInput";
import ModalFormSelectClient from "../../input/ModalFormSelectClient";
import ModalFormSelect from "../../input/ModalFormSelect";
import ModalFormContainer from "@/components/ui/layout/ModalFormContainer";
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
    client: defaultValues?.client || {},
    status: defaultValues?.status || "planning",
    hourlyRate: defaultValues?.hourlyRate || 0,
    startDate: defaultValues?.startDate || "",
    deadline: defaultValues?.deadline || "",
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
          value={form.client.id}
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
