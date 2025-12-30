import { Calendar } from "lucide-react";
import Link from "next/link";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug?: string;
    subtitle?: string;
    description: string;
    date: string;
    location: string;
    images: string[];
    imageUrl?: string;
    coverImage?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const image = event.coverImage || "/logo-fond-fushia.jpg";
  const date = new Date(event.date);
  
  // Format date: "14 Octobre - 20h00"
  const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
  const formattedDate = `${dateStr} - ${timeStr}`;

  return (
    <div className="bg-primary-200 rounded-xl overflow-hidden shadow-lg flex flex-col h-full border border-gray-800 group hover:border-gray-600 transition-colors">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-400/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-lg border border-gray-700">
            Spectacle
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center text-secondary text-sm mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="capitalize">{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
          {event.subtitle}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-end mt-auto pt-4 border-t border-gray-700">
          <Link 
            href={`/evenements/${event.slug || event._id}`}
            className="bg-secondary text-primary-400 px-6 py-3 rounded-lg font-medium text-sm transition-colors"
          >
            Détail
          </Link>
        </div>
      </div>
    </div>
  );
}
