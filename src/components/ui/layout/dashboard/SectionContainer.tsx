import AddButton from "../../input/AddButton";

export default function SectionContainer({
  title,
  onAdd,
  children,
}: Readonly<{
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full rounded-xl border-white border-2 p-8 my-8 text-start">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">{title}</h1>
        <AddButton onClick={onAdd} color="white" className="h-8 w-8" />
      </div>
      {children}
    </div>
  );
}
