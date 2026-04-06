import PageHeader from "@/components/ui/layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardCommon({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title={`Welcome ${user?.name}`}></PageHeader>
      {children}
    </div>
  );
}
