export default function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-[50vw] mx-auto mt-8 p-4 border-2 rounded-xl border-white">
      <h1 className="text-4xl text-center">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
