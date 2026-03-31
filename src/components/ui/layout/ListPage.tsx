import { MouseEvent } from "react";
import ListPageHeader from "./ListPageHeader";
import ListPageItem from "./ListPageItem";
import PageHeader from "./PageHeader";

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
  handleDelete: (e: MouseEvent<HTMLDivElement>, id: number) => void;
}) {
  function getValue(obj: any, path: any) {
    return path.split(".").reduce((acc: any, part: any) => acc?.[part], obj);
  }

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
              handleDelete={(e) => handleDelete(e, li.id)}
              fields={fields.map((f) => getValue(li, f.key))}
            />
          ))
        ) : (
          <p className="text-lg text-center">{`No ${title} found`}</p>
        )}
      </ul>
    </div>
  );
}
