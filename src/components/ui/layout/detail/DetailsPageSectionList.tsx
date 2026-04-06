import { MouseEvent } from "react";
import DetailsPageSectionListItem from "./DetailsPageSectionListItem";
import AddButton from "../../input/AddButton";
import { useModal } from "@/hooks/useModal";
import getFieldValue from "@/lib/utils/getFieldValue";

export default function DetailsPageSectionList({
  title,
  fields,
  list,
  handleAdd,
  handleClick,
}: {
  title: string;
  fields: Array<string>;
  list: Array<any>;
  handleAdd: (e: MouseEvent<HTMLDivElement>) => void;
  handleClick: (data: any) => void;
}) {
  return (
    <div className="p-8 border-2 rounded-xl mt-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">{title}</h1>
        <AddButton onClick={handleAdd} color="white" className="w-10 h-10" />
      </div>
      <div>
        {list ? (
          list.map((li) => (
            <DetailsPageSectionListItem
              key={li.id}
              fields={fields.map((f) => getFieldValue(li, f))}
              handleClick={() => handleClick(li)}
            />
          ))
        ) : (
          <p>{`${title} not found`}</p>
        )}
      </div>
    </div>
  );
}
