export default function ProjectHeader({ name }: { name: string }) {
  return (
    <div className="w-[50vw] mx-auto mt-8 p-4 border-2 rounded-xl border-white">
      <h1 className="text-4xl text-center">{name}</h1>
    </div>
  );
}
