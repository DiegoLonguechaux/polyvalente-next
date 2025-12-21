import EventForm from "@/components/EventForm";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const event = await Event.findById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Modifier l&apos;évènement</h1>
      <EventForm initialData={JSON.parse(JSON.stringify(event))} />
    </div>
  );
}
