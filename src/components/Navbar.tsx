"use client";

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path: string, isMobile = false) => {
    const baseClass = isMobile 
      ? "text-xl font-medium hover:text-secondary transition-colors border-b border-gray-700 pb-2"
      : "hover:text-secondary transition-colors";
      
    const activeClass = "text-secondary underline decoration-2 underline-offset-4";
    
    let isActive = false;
    if (path === '/') {
      isActive = pathname === '/';
    } else {
      isActive = pathname.startsWith(path);
    }

    return `${baseClass} ${isActive ? activeClass : ''}`;
  };

  return (
    <nav className="bg-primary-400 text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-secondary" onClick={() => setIsOpen(false)}>
          <img src="/lpv.png" alt="La Polyvalente Logo" className="h-8 md:h-16 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={getLinkClass('/')}>
            Accueil
          </Link>
          <Link href="/evenements" className={getLinkClass('/evenements')}>
            Évènements
          </Link>
          <Link href="/a-propos" className={getLinkClass('/a-propos')}>
            À propos
          </Link>
          <Link href="/espace-pro" className={getLinkClass('/espace-pro')}>
            Espace pro
          </Link>
          <Link href="/contact" className={getLinkClass('/contact')}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none z-50"
          onClick={toggleMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay (Backdrop) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-primary-400 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white focus:outline-none hover:text-secondary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-6">
          <Link 
            href="/" 
            className={getLinkClass('/', true)}
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            href="/evenements" 
            className={getLinkClass('/evenements', true)}
            onClick={() => setIsOpen(false)}
          >
            Évènements
          </Link>
          <Link 
            href="/a-propos" 
            className={getLinkClass('/a-propos', true)}
            onClick={() => setIsOpen(false)}
          >
            À propos
          </Link>
          <Link 
            href="/espace-pro" 
            className={getLinkClass('/espace-pro', true)}
            onClick={() => setIsOpen(false)}
          >
            Espace pro
          </Link>
          <Link 
            href="/contact" 
            className={getLinkClass('/contact', true)}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
