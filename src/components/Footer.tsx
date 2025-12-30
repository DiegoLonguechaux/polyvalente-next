import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-500 border-t border-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary uppercase tracking-wider">La Polyvalente</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Association culturelle et artistique à Limoges.
              Un lieu de rencontre, de partage et de création.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>1 rue des Papillons<br />87100 Limoges</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:0684920420">06 84 92 04 20</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:desenfant01@yahoo.fr">desenfant01@yahoo.fr</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">Accueil</Link>
              </li>
              <li>
                <Link href="/evenements" className="hover:text-secondary transition-colors">Évènements</Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-secondary transition-colors">À propos</Link>
              </li>
              <li>
                <Link href="/espace-pro" className="hover:text-secondary transition-colors">Espace Pro</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Suivez-nous</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/lapolyvalente87" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-400 p-3 rounded-lg border border-gray-700 text-gray-400 hover:text-secondary hover:border-secondary transition-all group"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/la_polyvalente_limoges/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-400 p-3 rounded-lg border border-gray-700 text-gray-400 hover:text-secondary hover:border-secondary transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} La Polyvalente. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
