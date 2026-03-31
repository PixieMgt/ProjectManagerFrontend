import { MouseEvent } from "react";
import EditButton from "../input/EditButton";
import DeleteButton from "../input/DeleteButton";

export default function ListPageItem({
  handleClick,
  handleEdit,
  handleDelete,
  fields,
}: {
  handleClick: (e: MouseEvent<HTMLLIElement>) => void;
  handleEdit: (e: MouseEvent<HTMLDivElement>) => void;
  handleDelete: (e: MouseEvent<HTMLDivElement>) => void;
  fields: Array<string>;
}) {
  return (
    <li
      className="flex items-center justify-between border-2 rounded-xl p-8 mt-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      {fields?.length > 0 &&
        fields.map((f, i) => (
          <h1 key={i} className="text-xl flex-1">
            {f}
          </h1>
        ))}
      <div className="flex flex-1 justify-end">
        <EditButton onClick={handleEdit} color="white" className="h-10 w-10" />
        <DeleteButton
          onClick={handleDelete}
          color="white"
          className="h-10 w-10 ml-4"
        />
      </div>
    </li>
  );
}
