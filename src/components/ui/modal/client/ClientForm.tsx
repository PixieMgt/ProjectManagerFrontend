import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../ModalFormContainer";
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

    const name = form?.name?.trim();
    const email = form?.email?.trim();
    const phone = form?.phone?.trim().replace(/\D/g, "");
    const notes = form?.notes?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length === 0) err += "\nName can't be empty";
    if (name.length > 128) err += "\nName is too long";
    if (!emailRegex.test(email)) err += "\nInvalid e-mail";
    if (phone.length < 8 || phone.length > 15) err += "\nInvalid phone number";
    if (notes.length > 2000) err += "\nNotes are too long";

    return err.length > 0 ? err : null;
  }

  return (
    <ModalFormContainer errorMessage={error} onSubmit={handleSubmit}>
      <ModalFormInput
        name="name"
        type="textShort"
        label="Name"
        placeholder="Company Name"
        value={form.name}
        onChange={handleChange}
      />
      <ModalFormInput
        name="email"
        type="textShort"
        label="E-mail"
        placeholder="Company E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <ModalFormInput
        name="phone"
        type="textShort"
        label="Phone"
        placeholder="Company Phone Number"
        value={form.phone}
        onChange={handleChange}
      />
      <ModalFormInput
        name="notes"
        type="textLong"
        label="Notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
