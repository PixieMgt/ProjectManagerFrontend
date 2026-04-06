export default function ModalReadContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 px-16 text-start">{children}</div>
    </div>
  );
}
