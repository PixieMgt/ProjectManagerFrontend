import AddButton from "@/components/ui/input/AddButton";
import EditButton from "@/components/ui/input/EditButton";
import { MouseEvent } from "react";

export default function DetailSectionCommon({
  title,
  addItem,
  setEditMode,
  children,
}: Readonly<{
  title: string;
  addItem?: () => void;
  setEditMode?: (e: MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}>) {
  return (
    <div className="border-2 rounded-xl p-4 mt-8">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4">{title}</h1>
        {addItem && (
          <AddButton onClick={addItem} color="white" className="h-8 w-8" />
        )}
        {setEditMode && (
          <EditButton onClick={setEditMode} color="white" className="h-8 w-8" />
        )}
      </div>
      {children}
    </div>
  );
}
