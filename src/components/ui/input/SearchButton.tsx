import { IconColorType } from "@/lib/utils/IconColorType";
import { MouseEvent } from "react";
import SearchIcon from "../icons/SearchIcon";

export default function SearchButton({
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
      <SearchIcon color={color} />
    </div>
  );
}
