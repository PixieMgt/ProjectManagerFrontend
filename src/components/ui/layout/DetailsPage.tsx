import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";

export default function DetailsPage({
  title,
  children,
}: {
  title: string;
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
    <div>
      <PageHeader title={title} />
      <div className="flex flex-col-2 gap-8 mx-8">
        <div className="flex-1">{leftChildren}</div>
        <div className="flex-1">{rightChildren}</div>
      </div>
    </div>
  );
}
