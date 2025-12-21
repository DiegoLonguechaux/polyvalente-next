import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <h1 className="text-5xl font-bold text-primary">Bienvenue à l&apos;Asso Polyvalente</h1>
      <p className="text-xl max-w-2xl text-gray-600">
        Découvrez nos activités, nos évènements et rejoignez une communauté dynamique et passionnée.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/events" 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
        >
          Voir les évènements
        </Link>
        <Link 
          href="/admin" 
          className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
        >
          Espace Membre
        </Link>
      </div>
    </div>
  );
}
