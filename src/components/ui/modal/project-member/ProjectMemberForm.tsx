import { ChangeEvent, SubmitEvent, useState } from "react";
import ModalFormContainer from "../../layout/ModalFormContainer";
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
    userEmail: defaultValues?.userEmail || "",
    user: defaultValues,
    role: defaultValues?.role || "viewer",
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
      {defaultValues?.userId ? (
        <ModalReadField label="Name" value={defaultValues?.name} />
      ) : (
        <ModalFormSearchProjectMember
          name="userEmail"
          label="User e-mail"
          searchValue={form.userEmail}
          result={form.user}
          setResult={(user) => setForm((prev) => ({ ...prev, user }))}
          onChange={handleChange}
        />
      )}
      <ModalFormSelect
        name="role"
        label="Role"
        value={form.role}
        options={["owner", "developer", "tester", "viewer"]}
        onChange={handleChange}
      />
    </ModalFormContainer>
  );
}
