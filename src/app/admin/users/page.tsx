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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Gérer les utilisateurs</h1>
        <Link
          href="/admin/users/new"
          className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </Link>
      </div>

      <UserTable users={serializedUsers} />
    </div>
  );
}
