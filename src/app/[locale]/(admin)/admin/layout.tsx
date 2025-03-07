import { Sidebar } from "@/src/components/admin/Sidebar";
import { Header } from "@/src/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 