import ModalReadField from "../../display/ModalReadField";
import ModalReadContainer from "../../layout/ModalReadContainer";

export default function ClientReadView({ client }: { client: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={client?.name} />
      <ModalReadField label="E-mail" value={client?.email || "No e-mail"} />
      <ModalReadField
        label="Phone Number"
        value={client?.phone || "No phone number"}
      />
      <ModalReadField label="Notes" value={client?.notes || "No notes"} />
    </ModalReadContainer>
  );
}
