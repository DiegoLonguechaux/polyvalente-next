import UserTable from "@/components/UserTable";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const users = await User.find({}, '-password').sort({ createdAt: -1 });
  const serializedUsers = JSON.parse(JSON.stringify(users));

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des utilisateurs</h1>
          <p className="text-gray-400">Gérez les accès, les rôles et les permissions des membres de l&apos;association.</p>
        </div>
        {session.user.role === 'super_admin' && (
          <Link
            href="/admin/users/new"
            className="bg-secondary text-primary font-medium px-4 py-2 rounded-lg flex items-center hover:bg-opacity-90 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un utilisateur
          </Link>
        )}
      </div>

      <div className="bg-primary-400 rounded-xl border border-gray-800 overflow-hidden">
        <UserTable users={serializedUsers} />
      </div>
    </div>
  );
}
