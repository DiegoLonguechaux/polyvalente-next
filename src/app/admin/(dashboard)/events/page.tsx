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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gérer les évènements</h1>
          <p className="text-gray-400">Planifiez et gérez les évènements de l&apos;association.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-secondary text-primary font-medium px-4 py-2 rounded-lg flex items-center hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un évènement
        </Link>
      </div>

      <div className="bg-primary-400 rounded-xl border border-gray-800 overflow-hidden">
        <EventTable events={serializedEvents} />
      </div>
    </div>
  );
}
