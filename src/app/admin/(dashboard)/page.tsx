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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-gray-400">Bienvenue, {session.user?.name} !</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/evenements" className="block p-6 bg-primary-400 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Gérer les évènements</h2>
          <p className="text-gray-400">Ajouter, modifier ou supprimer des évènements.</p>
        </Link>
        
        <Link href="/admin/users" className="block p-6 bg-primary-400 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Gérer les utilisateurs</h2>
          <p className="text-gray-400">Gérer les accès et les rôles des membres.</p>
        </Link>

        <Link href="/admin/contacts" className="block p-6 bg-primary-400 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Messages reçus</h2>
          <p className="text-gray-400">Voir les messages envoyés via le formulaire de contact.</p>
        </Link>
      </div>
    </div>
  );
}
