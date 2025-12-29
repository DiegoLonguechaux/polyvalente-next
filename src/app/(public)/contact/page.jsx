import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact - Polyburo",
  description: "Contactez-nous pour toute question ou demande d'information.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary-500 text-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-primary-400 flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary uppercase tracking-wider mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Avant d'interroger le monde, peut-être aimeriez vous tout d'abord NOUS interroger...
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
                Nos Coordonnées
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div>
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Adresse</h3>
                    <p className="text-gray-400">
                      1 rue des Papillons<br />
                      87100 Limoges, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div>
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Téléphone</h3>
                    <p className="text-gray-400">06 84 92 04 20</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div>
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p className="text-gray-400">desenfant01@yahoo.fr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2 bg-gray-600 rounded-lg overflow-hidden min-h-[250px] relative">
                <div className="absolute inset-0 flex items-center justify-center bg-primary-200">
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

          {/* Contact Form */}
          <div className="bg-primary-400 p-8 rounded-xl border border-gray-700 order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}