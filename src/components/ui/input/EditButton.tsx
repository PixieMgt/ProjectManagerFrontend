import EditIcon from "../icons/EditIcon";

export default function EditButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={`${className} hover:cursor-pointer`}>
      <EditIcon />
    </div>
  );
}
