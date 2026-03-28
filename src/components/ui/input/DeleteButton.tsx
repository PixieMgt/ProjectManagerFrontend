import { IconColorType } from "@/lib/utils/IconColorType";
import DeleteIcon from "../icons/DeleteIcon";
import { MouseEvent } from "react";

export default function DeleteButton({
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
      <DeleteIcon color={color} />
    </div>
  );
}
