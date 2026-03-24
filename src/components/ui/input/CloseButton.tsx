import CloseIcon from "@/components/ui/icons/CloseIcon";

export default function CloseButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={`${className} hover:cursor-pointer`}>
      <CloseIcon />
    </div>
  );
}
