import ModalReadField from "../../display/ModalReadField";
import ModalReadContainer from "../../layout/ModalReadContainer";

export default function ProjectMemberReadView({ member }: { member: any }) {
  return (
    <ModalReadContainer>
      <ModalReadField label="Name" value={member?.name} />
      <ModalReadField label="Role" value={member?.role} />
    </ModalReadContainer>
  );
}
