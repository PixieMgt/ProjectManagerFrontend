import { useModal } from "@/hooks/useModal";
import { modalMap } from "@/context/ModalContext";

export default function SectionModal() {
  const { shown, type, mode, data } = useModal();

  if (!shown) return;
  if (!type) return;

  const Component = modalMap[type];

  if (!Component) {
    console.error(`Unknow modal type: ${type}`);
    return null;
  }

  return <Component mode={mode} data={data} />;
}
