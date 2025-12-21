import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getEvents() {
  await dbConnect();
  const events = await Event.find({}).sort({ date: 1 });
  return events;
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Nos Évènements</h1>
      
      {events.length === 0 ? (
        <p className="text-gray-500">Aucun évènement prévu pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link 
              href={`/events/${event._id}`} 
              key={event._id.toString()}
              className="block group"
            >
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col">
                {event.imageUrl && (
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(event.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
