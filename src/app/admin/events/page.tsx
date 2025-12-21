import EventTable from "@/components/EventTable";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const events = await Event.find({}).sort({ date: 1 });
  const serializedEvents = JSON.parse(JSON.stringify(events));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Gérer les évènements</h1>
        <Link
          href="/admin/events/new"
          className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un évènement
        </Link>
      </div>

      <EventTable events={serializedEvents} />
    </div>
  );
}
