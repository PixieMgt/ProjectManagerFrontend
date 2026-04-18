import format from "@/lib/utils/formatting/format";
import ModalReadField from "../../display/ModalReadField";
import ModalReadContainer from "../ModalReadContainer";

export default function ProjectMemberReadView({ member }: { member: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={format("string", member?.name)} />
      <ModalReadField label="Role" value={format("role", member?.role)} />
    </ModalReadContainer>
  );
}
