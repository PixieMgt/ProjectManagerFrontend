export default function SectionContainer({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="w-full rounded-xl border-white border-2 p-4 text-start">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  );
}
