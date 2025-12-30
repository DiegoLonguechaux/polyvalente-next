import AdminCommentManager from "@/components/AdminCommentManager";
import EventForm from "@/components/EventForm";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  
  let event;
  const query = isValidObjectId(slug) ? { _id: slug } : { slug };
  event = await Event.findOne(query);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Modifier l&apos;évènement</h1>
      <EventForm initialData={JSON.parse(JSON.stringify(event))} />
      
      <AdminCommentManager eventId={event._id.toString()} />
    </div>
  );
}
