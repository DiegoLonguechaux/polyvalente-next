import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import ContactTable from "@/components/ContactTable";

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  const serializedContacts = JSON.parse(JSON.stringify(contacts));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Messages reçus</h1>
        <p className="text-gray-400">Consultez les messages envoyés via le formulaire de contact.</p>
      </div>
      
      <div className="bg-[#1E272C] rounded-xl border border-gray-800 overflow-hidden">
        <ContactTable contacts={serializedContacts} />
      </div>
    </div>
  );
}
