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
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white"><span className="text-secondary">La Polyvalente</span><br/> culture dépendance, depuis 2021</h1>
        <p className="text-xl lg:text-2xl max-w-3xl text-gray-200">
          Découvrez nos activités, nos évènements et rejoignez une communauté dynamique et passionnée.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            href="/evenements" 
            className="bg-secondary text-primary-400 px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all text-lg"
          >
            Voir les évènements
          </Link>
          <Link 
            href="/a-propos" 
            className="text-secondary px-6 py-3 rounded-lg border border-secondary transition-all text-lg"
          >
            Découvrir l'association
          </Link>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-4 space-y-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="text-secondary font-medium mb-2 uppercase tracking-wider border-l-2 border-secondary pl-2">L'association</p>
              <h3 className="text-3xl font-bold text-white">Et si on parlait de nous ?</h3>
            </div>
            <div>
              <p className="text-lg text-gray-400 leading-relaxed">
                La Polyvalente est bien plus qu'une simple association. C'est un lieu de vie, de création et de partage où chacun peut trouver sa place.
                Nous organisons régulièrement des concerts, des pièces de théâtre, des ateliers et des rencontres pour animer la vie culturelle locale.
              </p>
            </div>
          </div>
          <div className="flex">
            <Link href="/a-propos" className="inline-block text-secondary font-bold hover:underline text-lg">
              En savoir plus sur notre histoire →
            </Link>
          </div>
        </div>
        <div className="shadow-xl">
          <img src="/team.jpg" alt="L'équipe de La Polyvalente" className="rounded-xl" />
        </div>
      </div>

      <div>
        <div className="mb-8">
          <p className="text-secondary font-medium mb-2 uppercase tracking-wider border-l-2 border-secondary pl-2">À l'affiche</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <h2 className="text-4xl font-bold text-white">Prochains évènements</h2>
            <Link href="/evenements" className="text-secondary hover:underline font-medium flex items-center">
              Voir tous les évènements →
            </Link>
          </div>
        </div>
        
        <EventsCarousel events={events} />
      </div>
    </div>
  </>);
}
