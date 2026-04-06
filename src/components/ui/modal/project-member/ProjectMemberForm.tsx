import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../ModalFormContainer";
import ModalFormSelect from "../../input/ModalFormSelect";
import ModalFormSearchProjectMember from "../../input/ModalFormSearchProjectMember";
import ModalReadField from "../../display/ModalReadField";

export default function ProjectMemberForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: any;
  onSubmit: (form: any) => void;
}) {
  const [form, setForm] = useState({
    email: "",
    userId: defaultValues?.id || -1,
    role: defaultValues?.role || "viewer",
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

    const email = form?.email?.trim();
    const id = form?.userId;
    const role = form?.role?.trim();

    if (id < 0) err += "\nPlease search a user";

    return err.length > 0 ? err : null;
  }

  return (
    <ModalFormContainer errorMessage={error} onSubmit={handleSubmit}>
      {defaultValues?.id ? (
        <ModalReadField label="Name" value={defaultValues?.name} />
      ) : (
        <ModalFormSearchProjectMember
          name="email"
          label="User e-mail"
          searchValue={form?.email}
          result={form?.userId}
          setResult={(userId) => setForm((prev) => ({ ...prev, userId }))}
          onChange={handleChange}
        />
      )}
      <ModalFormSelect
        name="role"
        label="Role"
        value={form?.role}
        options={["owner", "developer", "tester", "viewer"]}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
