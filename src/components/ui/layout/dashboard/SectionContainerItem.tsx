import getFieldValue from "@/lib/utils/getFieldValue";

export default function SectionContainerItem({
  item,
  fields,
  onClick,
}: {
  item: any;
  fields: Array<string>;
  onClick: () => void;
}) {
  return (
    <div
      className="flex justify-between border-b-2 mb-4 pb-1 hover:cursor-pointer"
      onClick={onClick}
    >
      {fields.length > 0 &&
        fields.map((f, i) => (
          <p key={i} className="text-xl flex-1">
            {getFieldValue(item, f)}
          </p>
        ))}
    </div>
  );
}
