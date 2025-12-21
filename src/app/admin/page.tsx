import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Tableau de bord Admin</h1>
      <p>Bienvenue, {session.user?.name} !</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/events" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-secondary">
          <h2 className="text-xl font-bold mb-2">Gérer les évènements</h2>
          <p className="text-gray-600">Ajouter, modifier ou supprimer des évènements.</p>
        </Link>
        
        <Link href="/admin/users" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-primary">
          <h2 className="text-xl font-bold mb-2">Gérer les utilisateurs</h2>
          <p className="text-gray-600">Ajouter de nouveaux administrateurs.</p>
        </Link>
      </div>
    </div>
  );
}
