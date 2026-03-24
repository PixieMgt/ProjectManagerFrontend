import AddButton from "./input/AddButton";

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
    <div className="w-full rounded-xl border-white border-2 p-4 m-4 text-start">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{title}</h1>
        <AddButton onClick={onAdd} className="h-8 w-8" />
      </div>
      {children}
    </div>
  );
}
