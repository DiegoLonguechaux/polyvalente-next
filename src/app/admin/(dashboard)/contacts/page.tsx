import ContactHeader from "@/components/ContactHeader";
import ContactTable from "@/components/ContactTable";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const contacts = await Contact.find({}).sort({ read: 1, createdAt: -1 });
  const serializedContacts = JSON.parse(JSON.stringify(contacts));

  return (
    <div>
      <div className="mb-8">
        <ContactHeader />
        <p className="text-gray-400">Consultez les messages envoyés via le formulaire de contact.</p>
      </div>
      
      <div className="bg-primary-400 rounded-xl border border-gray-800 overflow-hidden">
        <ContactTable contacts={serializedContacts} />
      </div>
    </div>
  );
}
