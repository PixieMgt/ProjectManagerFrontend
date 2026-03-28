import AddIcon from "@/components/ui/icons/AddIcon";
import { IconColorType } from "@/lib/utils/IconColorType";
import { MouseEvent } from "react";

export default function AddButton({
  onClick,
  color,
  className,
}: {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  color: IconColorType;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={`${className} hover:cursor-pointer`}>
      <AddIcon color={color} />
    </div>
  );
}
