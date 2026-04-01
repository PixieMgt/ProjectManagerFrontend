export default function DetailsPageSectionListItem({
  fields,
  handleClick,
}: {
  fields: Array<string>;
  handleClick: () => void;
}) {
  return (
    <li
      className="flex items-center justify-between border-2 rounded-xl p-8 mt-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      {fields.length > 0 && fields.map((f, i) => <h1 key={i}>{f}</h1>)}
    </li>
  );
}
