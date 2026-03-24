import { useModal } from "@/hooks/useModal";
import CloseButton from "../input/CloseButton";
import EditButton from "../input/EditButton";
import DeleteButton from "../input/DeleteButton";

export default function SectionModalCommon({
  title,
  setEditMode,
  deleteItem,
  children,
}: {
  title: string;
  setEditMode: () => void;
  deleteItem: () => void;
  children: React.ReactNode;
}) {
  const { shown, mode, closeModal } = useModal();

  if (!shown) return;

  return (
    <>
      <div className="fixed h-screen w-screen left-0 top-0 bg-black opacity-[80%]" />
      <div className="fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-white text-black rounded-xl">
        <div className="flex p-8 justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl">{title}</h1>
            {mode === "read" && (
              <EditButton onClick={setEditMode} className="flex h-8 w-8 ml-4" />
            )}
            {(mode === "read" || mode === "update") && (
              <DeleteButton
                onClick={deleteItem}
                className="flex h-9 w-9 ml-4"
              />
            )}
          </div>
          <CloseButton onClick={closeModal} className="h-10 w-10" />
        </div>
        {children}
      </div>
    </>
  );
}
