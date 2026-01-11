import AdminSidebar from "@/components/AdminSidebar";
import { NotificationProvider } from "@/context/NotificationContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-primary-500">
        <AdminSidebar />
        <main className="flex-grow ml-64 p-8 text-white">
          {children}
        </main>
      </div>
    </NotificationProvider>
  );
}
