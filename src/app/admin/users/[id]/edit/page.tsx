import UserForm from "@/components/UserForm";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const { id } = await params;
  const user = await User.findById(id);

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  const serializedUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Modifier l&apos;utilisateur</h1>
      <UserForm initialData={serializedUser} />
    </div>
  );
}
