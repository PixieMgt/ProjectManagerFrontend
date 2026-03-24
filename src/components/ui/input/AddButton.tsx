import AddIcon from "@/components/ui/icons/AddIcon";

export default function AddButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={`${className} hover:cursor-pointer`}>
      <AddIcon />
    </div>
  );
}
