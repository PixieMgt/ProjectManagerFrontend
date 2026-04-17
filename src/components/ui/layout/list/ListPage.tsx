import { MouseEvent } from "react";
import PageHeader from "../PageHeader";
import ListPageHeader from "./ListPageHeader";
import ListPageItem from "./ListPageItem";
import getFieldValue from "@/lib/utils/getFieldValue";

export default function ListPage({
  title,
  fields,
  list,
  handleClick,
  handleAdd,
  handleEdit,
  handleDelete,
}: {
  title: string;
  fields: Array<{ label: string; key: string }>;
  list: Array<any>;
  handleClick: (e: MouseEvent<HTMLLIElement>, id: number) => void;
  handleAdd: (e: MouseEvent<HTMLDivElement>) => void;
  handleEdit: (e: MouseEvent<HTMLDivElement>, data: any) => void;
  handleDelete: (e: MouseEvent<HTMLDivElement>, data: any) => void;
}) {
  return (
    <div>
      <PageHeader title={title} />
      <ul className="m-8">
        <ListPageHeader
          fields={fields.map((f) => f.label)}
          handleAdd={handleAdd}
        />
        {list ? (
          list.map((li) => (
            <ListPageItem
              key={li.id}
              handleClick={(e) => handleClick(e, li.id)}
              handleEdit={(e) => handleEdit(e, li)}
              handleDelete={(e) => handleDelete(e, li)}
              fields={fields.map((f) => getFieldValue(li, f.key))}
            />
          ))
        ) : (
          <p className="text-lg text-center">{`No ${title} found`}</p>
        )}
      </ul>
    </div>
  );
}
