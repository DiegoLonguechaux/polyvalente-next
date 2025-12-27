import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";

export const dynamic = 'force-dynamic';

async function getEvents(searchParams: { [key: string]: string | string[] | undefined }) {
  await dbConnect();
  
  const query: any = {};

  // Filter by category
  if (searchParams.category) {
    query.category = searchParams.category;
  }

  // Filter by year
  if (searchParams.year) {
    const year = parseInt(searchParams.year as string);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
    query.date = {
      $gte: startDate,
      $lt: endDate
    };
  }

  const events = await Event.find(query).sort({ date: 1 });
  return events;
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const events = await getEvents(resolvedSearchParams);

  return (
    <div className="container mx-auto px-4 space-y-16 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Nos Évènements</h1>
      
      <EventFilters />

      {events.length === 0 ? (
        <p className="text-gray-500">Aucun évènement trouvé pour ces critères.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id.toString()} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
