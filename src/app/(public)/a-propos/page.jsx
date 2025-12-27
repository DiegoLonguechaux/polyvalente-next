import { Download, Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    { name: "MANU", image: "/polyburo/manu.jpg" },
    { name: "DANIEL", image: "/polyburo/daniel.jpg" },
    { name: "CHRISTIAN", image: "/polyburo/christian.jpg" },
    { name: "VÉRONIQUE", image: "/polyburo/veronique.jpg" },
    { name: "PHILIPPE", image: "/polyburo/philippe.jpg" },
    { name: "SOPHIE", image: "/polyburo/sophie.jpg" },
    { name: "CORINE", image: "/polyburo/corine.jpg" },
    { name: "CHRISTOPHE", image: "/polyburo/christophe.jpg" },
    { name: "SYLVIE", image: "/polyburo/sylvie.jpg" },
    { name: "PIERRE", image: "/polyburo/pierre.jpg" },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Header Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary uppercase tracking-widest">Qui sommes-nous ?</h1>
      </div>

      {/* Genèse Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-secondary uppercase tracking-wider">Genèse de la Polyvalente</h2>
            <div className="text-gray-300 space-y-4 text-justify leading-relaxed">
              <p>
                Chers amis, amis d'amis, copains et copains de copains, potes et potes de potes... C'est l'histoire d'une bande d'amis d'anciens collègues des centres culturels de Limoges qui ont décidé de se réunir à nouveau et de reprendre du service pour se prouver que 30 ans plus tard, rien n'a changé, ou presque... C'est l'histoire d'une période post confinement, terriblement chaotique marquée par la distanciation, l'essentiel et le non essentiel et surtout le chacun chez soi et personne chez les autres, ou presque...
              </p>
              <p>
                C'est enfin l'histoire d'un garage désaffecté, d'une dépendance servant à l'occasion de salle des fêtes ou de banquet qui ne demandait qu'à s'ouvrir et s'embellir pour accueillir des soirées conviviales, du public, des spectacles, des artistes, des stars internationales ou presque...
              </p>
              <p className="italic">
                C'est ainsi qu'est née « La Polyvalente »
              </p>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[400px] w-full rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl">
            {/* Using a placeholder or existing image */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <img src="/team.jpg" alt="La salle" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Le Polyburo Section */}
      <section className="bg-primary-500 py-16">
        <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl font-bold text-secondary text-center mb-16 uppercase">Le Polyburo</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-700 grayscale group-hover:grayscale-0 transition-all duration-300">
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                            {/* Placeholder for avatar */}
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <span className="text-white font-medium uppercase tracking-wider text-sm">{member.name}</span>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* Adhésion Section */}
      <section className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-secondary uppercase">Adhésion</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pour participer à nos activités, assister aux spectacles et soutenir la vie culturelle de notre association, l'adhésion est indispensable. Elle permet de couvrir les frais de fonctionnement et de continuer à vous proposer des évènements de qualité. Rejoignez notre communauté passionnée !
          </p>
      </section>

      {/* Vie de l'association Section */}
      <section className="bg-primary-500 py-16">
        <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8 uppercase">Vie de l'association</h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
            La transparence est au cœur de notre fonctionnement. Retrouvez ici tous les documents officiels relatifs à la gestion de l'association, y compris nos statuts et les comptes-rendus de nos assemblées générales annuelles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Statuts */}
            <div className="space-y-4">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-gray-700 pb-2">Statuts</h3>
                <a href="/docs/DC-V8.pdf" download className="w-full bg-[#2C353A] hover:bg-[#374248] text-gray-300 py-4 px-6 rounded flex items-center justify-between transition-colors group">
                <span className="font-medium text-sm uppercase">Télécharger les statuts</span>
                <Download className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                </a>
            </div>

            {/* Compte Rendu AG */}
            <div className="space-y-4">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-gray-700 pb-2">Compte Rendu d'AG</h3>
                <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'AG 2021', file: 'ag_2021.pdf' },
                  { label: 'AG 2022', file: 'ag_2022.pdf' },
                  { label: 'AG 2023', file: 'ag_2023.pdf' },
                  { label: 'AG 2024', file: 'ag_2024.pdf' },
                ].map((doc) => (
                    <a key={doc.label} href={`/docs/${doc.file}`} download className="bg-[#2C353A] hover:bg-[#374248] text-gray-300 py-4 px-6 rounded flex items-center justify-between transition-colors group">
                    <span className="font-medium text-sm uppercase">{doc.label}</span>
                    <Download className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                    </a>
                ))}
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-4xl font-bold text-secondary text-center mb-4 uppercase">Contact</h2>
        <p className="text-gray-400 text-center italic mb-12">
          Avant d'interroger le monde, peut-être aimeriez vous tout d'abord NOUS interroger...
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <div className="bg-primary-500 p-8 rounded-lg border border-gray-800 h-full">
            <h3 className="text-xl font-bold text-secondary mb-8 uppercase">La Polyvalente</h3>
            <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest">Siège Social</p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <p className="text-white font-bold">Adresse</p>
                  <p className="text-gray-400 text-sm">1 Rue des Papillons<br/>87000 Limoges</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-secondary mt-1" />
                <div>
                    <p className="text-white font-bold">Téléphone</p>
                    <a href="tel:0684920420" className="text-gray-400 text-sm hover:underline">06 84 92 04 20</a>
                    {/* <p className="text-gray-400 text-sm">06 84 92 04 20</p> */}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <p className="text-white font-bold">Email</p>
                  <a href="mailto:desenfant01@yahoo.fr" className="text-gray-400 text-sm hover:underline">desenfant01@yahoo.fr</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-gray-600 rounded-lg overflow-hidden min-h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center bg-[#2C353A]">
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
        </div>
      </section>
    </div>
  );
}