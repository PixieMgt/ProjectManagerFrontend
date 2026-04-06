import { IconColorType } from "@/lib/utils/IconColorType";
import { MouseEvent } from "react";
import SettingsIcon from "../icons/SettingsIcon";

export default function SettingsButton({
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
      <SettingsIcon color={color} />
    </div>
  );
}
