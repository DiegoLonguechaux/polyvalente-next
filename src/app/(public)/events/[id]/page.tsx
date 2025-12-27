import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  let event;
  try {
    event = await Event.findById(id);
  } catch {
    notFound();
  }

  if (!event) {
    notFound();
  }

  const images = event.images && event.images.length > 0 
    ? event.images 
    : (event.imageUrl ? [event.imageUrl] : []);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/events" className="inline-flex items-center text-primary hover:text-secondary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux évènements
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {images.length > 0 && (
          <div className="h-64 md:h-96 bg-gray-200 relative">
            <img 
              src={images[0]} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-secondary" />
              <span>
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-secondary" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-8">
            {event.description}
          </div>

          {images.length > 1 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Galerie photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.slice(1).map((img: string, index: number) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={img} 
                      alt={`${event.title} - photo ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
