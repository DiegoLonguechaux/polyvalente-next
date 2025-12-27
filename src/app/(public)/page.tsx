import EventsCarousel from "@/components/EventsCarousel";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getUpcomingEvents() {
  await dbConnect();
  const events = await Event.find({
    date: { $gte: new Date() }
  }).sort({ date: 1 });
  return JSON.parse(JSON.stringify(events));
}

export default async function Home() {
  const events = await getUpcomingEvents();

  return (<>
    <div 
      className="relative flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/salle.JPG')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-primary-400 m-0"></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-8 p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white"><span className="text-secondary">La Polyvalente</span><br/> culture dépendance, depuis 2021</h1>
        <p className="text-xl md:text-2xl max-w-3xl text-gray-200">
          Découvrez nos activités, nos évènements et rejoignez une communauté dynamique et passionnée.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/events" 
            className="bg-secondary text-primary-400 px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all font-bold text-lg"
          >
            Voir les évènements
          </Link>
          <Link 
            href="/a-propos" 
            className="text-secondary px-6 py-3 rounded-lg border border-secondary transition-all font-bold text-lg"
          >
            Découvrir l'association
          </Link>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-4 space-y-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white">Et si on parlait de nous ?</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            La Polyvalente est bien plus qu'une simple association. C'est un lieu de vie, de création et de partage où chacun peut trouver sa place.
            Nous organisons régulièrement des concerts, des pièces de théâtre, des ateliers et des rencontres pour animer la vie culturelle locale.
          </p>
          <Link href="/a-propos" className="inline-block text-secondary font-bold hover:underline text-lg">
            En savoir plus sur notre histoire →
          </Link>
        </div>
        <div className="shadow-xl">
          <img src="/team.jpg" alt="L'équipe de La Polyvalente" className="rounded-xl" />
        </div>
      </div>

      <div>
        <div className="mb-8">
          <p className="text-secondary font-medium mb-2 uppercase tracking-wider">À l'affiche</p>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl font-bold text-primary">Prochains évènements</h2>
            <Link href="/events" className="text-secondary hover:text-primary transition-colors font-medium flex items-center">
              Voir tous les évènements <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
        
        <EventsCarousel events={events} />
      </div>
    </div>
  </>);
}
