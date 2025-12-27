import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#151A1E]">
      <AdminSidebar />
      <main className="flex-grow ml-64 p-8 text-white">
        {children}
      </main>
    </div>
  );
}
