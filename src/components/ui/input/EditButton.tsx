import { IconColorType } from "@/lib/utils/IconColorType";
import EditIcon from "../icons/EditIcon";
import { MouseEvent } from "react";

export default function EditButton({
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
      <EditIcon color={color} />
    </div>
  );
}
