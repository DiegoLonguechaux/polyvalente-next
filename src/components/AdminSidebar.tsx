"use client";

import { Calendar, LayoutDashboard, LogOut, MessageSquare, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const menuItems = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Événements", href: "/admin/evenements", icon: Calendar },
    { name: "Utilisateurs", href: "/admin/users", icon: Users },
    { name: "Messages", href: "/admin/contacts", icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-primary-400 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800">
      {/* User Profile */}
      <div className="p-6 flex items-center space-x-4 border-b border-gray-800">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-bold">
          {session?.user?.name?.charAt(0) || "A"}
        </div>
        <div>
          <p className="font-medium text-sm">{session?.user?.name}</p>
          <p className="text-xs text-gray-400">{session?.user?.role === "super_admin" ? "Super Administrateur" : "Administrateur"}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href) && (item.href !== "/admin" || pathname === "/admin");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-primary-200 text-secondary"
                  : "text-gray-400 hover:bg-primary-200 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-primary-200 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
