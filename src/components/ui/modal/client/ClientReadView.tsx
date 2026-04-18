import format from "@/lib/utils/formatting/format";
import ModalReadField from "../../display/ModalReadField";
import ModalReadContainer from "../ModalReadContainer";

export default function ClientReadView({ client }: { client: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={format("string", client?.name)} />
      <ModalReadField
        label="E-mail"
        value={format("string", client?.email) || "No e-mail"}
      />
      <ModalReadField
        label="Phone Number"
        value={format("string", client?.phone) || "No phone number"}
      />
      <ModalReadField
        label="Notes"
        value={format("string", client?.notes) || "No notes"}
      />
    </ModalReadContainer>
  );
}
