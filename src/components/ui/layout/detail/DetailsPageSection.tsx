import React, { MouseEvent, useEffect, useState } from "react";
import EditButton from "../../input/EditButton";

export default function DetailsPageSection({
  title,
  handleEdit,
  children,
}: {
  title: string;
  handleEdit: (e: MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}) {
  const [leftChildren, setLeftChildren] = useState<React.ReactNode | null>(
    null,
  );
  const [rightChildren, setRightChildren] = useState<React.ReactNode | null>(
    null,
  );

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);

    const left: React.ReactNode[] = [];
    const right: React.ReactNode[] = [];

    childrenArray.forEach((child, index) => {
      if (index % 2 === 0) {
        left.push(child);
      } else {
        right.push(child);
      }
    });

    setLeftChildren(left);
    setRightChildren(right);
  }, [children]);

  return (
    <div className="p-8 border-2 rounded-xl mt-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">{title}</h1>
        <EditButton onClick={handleEdit} color="white" className="h-10 w-10" />
      </div>
      <div className="flex flex-col-2">
        <div className="flex-1">{leftChildren}</div>
        <div className="flex-1">{rightChildren}</div>
      </div>
    </div>
  );
}
