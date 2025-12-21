"use client";

import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthNav() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 hover:text-secondary transition-colors"
          title="Tableau de bord"
        >
          <User className="w-4 h-4" />
          <span className="hidden md:inline">Admin</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors text-sm"
          title="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Déconnexion</span>
        </button>
      </div>
    );
  }

  return (
    <Link href="/admin" className="hover:text-secondary transition-colors">
      Espace Admin
    </Link>
  );
}
