import DeleteIcon from "../icons/DeleteIcon";

export default function DeleteButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={`${className} hover:cursor-pointer`}>
      <DeleteIcon />
    </div>
  );
}
