import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { ArrowLeft, Calendar, Clock, Facebook, Globe, Instagram, MapPin } from "lucide-react";
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

  // Use coverImage if available, otherwise fallback to first image in gallery, otherwise placeholder
  const heroImage = event.coverImage || (event.images && event.images.length > 0 ? event.images[0] : "/salle.JPG");
  
  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151A1E] via-black/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <Link href="/events" className="inline-flex items-center text-gray-300 hover:text-secondary mb-6 transition-colors uppercase text-sm tracking-widest">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux évènements
            </Link>
            <div className="space-y-2">
                {event.category && (
                    <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-bold uppercase tracking-wider rounded-sm mb-2">
                        {event.category}
                    </span>
                )}
                <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wide">{event.title}</h1>
                {event.subtitle && (
                    <p className="text-xl md:text-2xl text-gray-300 font-light italic">{event.subtitle}</p>
                )}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-2 space-y-12">
                {/* Info Bar (Mobile/Tablet mostly, but good for all) */}
                <div className="bg-primary-200 p-6 rounded-lg border border-gray-800 flex flex-wrap gap-8 items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#2C353A] rounded-full">
                            <Calendar className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                            <p className="text-white font-medium capitalize">
                                {eventDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#2C353A] rounded-full">
                            <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Heure</p>
                            <p className="text-white font-medium">
                                {eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#2C353A] rounded-full">
                            <MapPin className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Lieu</p>
                            <p className="text-white font-medium">{event.location}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">Description de l'évènement</h2>
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {event.description}
                    </div>
                </div>

                {/* Artist Note */}
                {event.artistNote && (
                    <div className="bg-primary-200 p-8 rounded-lg border border-gray-800 relative">
                        <div className="absolute -top-4 left-8 bg-secondary text-primary px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                            Le mot de l'artiste
                        </div>
                        <p className="text-gray-300 italic text-lg leading-relaxed">
                            "{event.artistNote}"
                        </p>
                    </div>
                )}

            {/* Gallery */}
            {event.images && event.images.length > 0 && (
              <div className="space-y-6 pt-8">
                <h2 className="text-2xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">Galerie</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.map((img: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img 
                        src={img} 
                        alt={`Galerie ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            {/* Artist Card */}
            {(event.artistImage || event.artistWebsite || event.facebookLink || event.instagramLink) && (
              <div className="overflow-hidden top-24">
                {event.artistImage && (
                  <div className="relative flex justify-center mb-4">
                    <img 
                      src={event.artistImage} 
                      alt="Artiste" 
                      className="object-cover h-128 rounded-2xl"
                    />
                  </div>
                )}
                <div className="p-6 space-y-6">
                  <div className="flex justify-center gap-4">
                    {event.artistWebsite && (
                      <a href={event.artistWebsite} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2C353A] rounded-full text-gray-400 hover:text-secondary hover:bg-black transition-all">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {event.facebookLink && (
                      <a href={event.facebookLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2C353A] rounded-full text-gray-400 hover:text-secondary hover:bg-black transition-all">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {event.instagramLink && (
                      <a href={event.instagramLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2C353A] rounded-full text-gray-400 hover:text-secondary hover:bg-black transition-all">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
