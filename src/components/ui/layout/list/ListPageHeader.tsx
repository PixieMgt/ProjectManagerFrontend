import { MouseEvent } from "react";
import AddButton from "../../input/AddButton";

export default function ListPageHeader({
  fields,
  handleAdd,
}: {
  fields: Array<string>;
  handleAdd: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className="flex justify-between items-center px-8">
      {fields?.length > 0 &&
        fields.map((f, i) => (
          <h1 key={i} className="flex-1">
            {f}
          </h1>
        ))}
      <div className="flex-1">
        <AddButton
          onClick={handleAdd}
          color="white"
          className="h-10 w-10 ml-auto"
        />
      </div>
    </div>
  );
}
