import { Download, MapPin, Music, Settings } from "lucide-react";

export default function ProPage() {
  return (
    <div className="space-y-24 py-12">
      {/* Header */}
      <div className="text-center space-y-4 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary uppercase tracking-widest">Espace Pro</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Bienvenue sur l'espace dédié aux artistes et techniciens. Vous trouverez ici toutes les informations nécessaires pour préparer votre venue à La Polyvalente.
        </p>
      </div>

      {/* Gallery Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider flex items-center gap-3">
          <Music className="text-secondary" />
          Le Lieu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Image */}
          <div className="lg:col-span-2 row-span-2 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-800 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
            <img 
              src="/salle.JPG" 
              alt="Salle de spectacle principale" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-white font-bold text-lg">La Grande Salle</p>
              <p className="text-gray-300 text-sm">Capacité : 200 places debout / 120 assises</p>
            </div>
          </div>

          {/* Secondary Images (Placeholders for now) */}
          <div className="relative h-[240px] rounded-lg overflow-hidden border border-gray-800 group">
             <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <img src="/salle1.jpg" alt="" className="transition-transform duration-500 group-hover:scale-105" />
             </div>
          </div>
          <div className="relative h-[240px] rounded-lg overflow-hidden border border-gray-800 group">
             <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <img src="/salle2.jpg" alt="" className="transition-transform duration-500 group-hover:scale-105" />
             </div>
          </div>
        </div>
      </section>

      {/* Technical Documents Section */}
      <section className="bg-primary-500 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 uppercase tracking-wider flex items-center gap-3">
            <Settings className="text-secondary" />
            Documents Techniques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Fiche Technique */}
            <div className="bg-primary-400 p-8 rounded-lg border border-gray-800 hover:border-secondary/50 transition-colors group">
              <div className="flex justify-start items-start mb-6">
                <div className="p-3 bg-[#2C353A] rounded-lg">
                  <Settings className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fiche Technique</h3>
              <p className="text-gray-400 text-sm mb-6">
                Détails complets sur le système son, lumières, dimensions de la scène et équipements disponibles.
              </p>
              <button className="w-full py-3 px-4 bg-secondary text-primary font-bold rounded hover:bg-[#d4c3ab] transition-colors flex items-center justify-center gap-2 uppercase text-sm">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>

            {/* Plan de Scène */}
            <div className="bg-primary-400 p-8 rounded-lg border border-gray-800 hover:border-secondary/50 transition-colors group">
              <div className="flex justify-start items-start mb-6">
                <div className="p-3 bg-[#2C353A] rounded-lg">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Plan de Scène</h3>
              <p className="text-gray-400 text-sm mb-6">
                Plan détaillé de l'implantation scénique, accès décors et configuration de la salle.
              </p>
              <button className="w-full py-3 px-4 bg-secondary text-primary font-bold rounded hover:bg-[#d4c3ab] transition-colors flex items-center justify-center gap-2 uppercase text-sm">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider flex items-center gap-3">
          <MapPin className="text-secondary" />
          Accès & Localisation
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="bg-[#151A1E] p-8 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-secondary mb-6 uppercase">Informations d'accès</h3>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <p className="font-bold text-white mb-1">Adresse</p>
                <p>1 Rue des Papillons<br/>87000 Limoges</p>
              </div>
              
              <div>
                <p className="font-bold text-white mb-1">Accès Déchargement</p>
                <p className="text-sm">
                  Accès direct à la scène par l'arrière du bâtiment.
                  Porte de garage.
                  Stationnement réservé pour 1 véhicule.
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1">Contact Régie</p>
                <p className="text-sm">
                  Pour toute question technique :<br/>
                  <a href="mailto:p.longuechaux@gmail.com" className="text-secondary hover:underline">p.longuechaux@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden min-h-[300px] relative border border-gray-700">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6926.589922389936!2d1.2649033767507838!3d45.844867607958804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f934c2204e6ab9%3A0x5f282410e29b51cf!2s1%20Rue%20des%20Papillons%2C%2087100%20Limoges!5e1!3m2!1sfr!2sfr!4v1766774558394!5m2!1sfr!2sfr"
                width="100%" 
                height="100%"
                style={{ border: 0 }} 
                allowfullscreen 
                loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}