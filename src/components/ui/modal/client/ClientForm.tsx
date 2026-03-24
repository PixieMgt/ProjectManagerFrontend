import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
import ModalFormInput from "../../input/ModalFormInput";

export default function ClientForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const [form, setForm] = useState({
    name: defaultValues?.name || "",
    email: defaultValues?.email || "",
    phone: defaultValues?.phone || "",
    notes: defaultValues?.notes || "",
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
        placeholder="Company Name"
        value={form.name}
        onChange={handleChange}
      />
      <ModalFormInput
        name="email"
        type="text"
        label="E-mail"
        placeholder="Company E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <ModalFormInput
        name="phone"
        type="text"
        label="Phone"
        placeholder="Company Phone Number"
        value={form.phone}
        onChange={handleChange}
      />
      <ModalFormInput
        name="notes"
        type="text"
        label="Notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
