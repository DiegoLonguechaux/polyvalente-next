"use client";

import DeleteUserButton from "@/components/DeleteUserButton";
import Table, { Column } from "@/components/Table";
import { ArrowUpDown, Edit, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface UserTableProps {
  users: any[];
}

export default function UserTable({ users }: UserTableProps) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

  const filteredAndSortedUsers = useMemo(() => {
    let processed = [...users];

    // Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(user => 
        user.name.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    processed.sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === 'email') {
        return sortConfig.direction === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      if (sortConfig.key === 'role') {
        return sortConfig.direction === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      }
      return 0;
    });

    return processed;
  }, [users, searchTerm, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const columns: Column<any>[] = [
    {
      header: "Nom",
      accessorKey: "name",
      render: (user) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold mr-3">
            {user.name.charAt(0)}
          </div>
          <div className="text-sm font-medium text-white">{user.name}</div>
        </div>
      )
    },
    {
      header: "Email",
      accessorKey: "email",
      render: (user) => <div className="text-sm text-gray-400">{user.email}</div>
    },
    {
      header: "Rôle",
      accessorKey: "role",
      render: (user) => {
        let roleLabel = 'Bénévole';
        let roleClass = 'bg-gray-700 text-gray-300 border border-gray-600';
        
        if (user.role === 'super_admin') {
          roleLabel = 'Super Admin';
          roleClass = 'bg-secondary text-primary border border-secondary';
        } else if (user.role === 'admin') {
          roleLabel = 'Admin';
          roleClass = 'bg-secondary/20 text-secondary border border-secondary/30';
        }

        return (
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClass}`}>
            {roleLabel}
          </span>
        );
      }
    },
    {
      header: "Date de création",
      render: (user) => (
        <div className="text-sm text-gray-400">
          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      header: "Actions",
      className: "text-right",
      render: (user) => {
        if (session?.user?.role !== 'super_admin') {
          return <div className="text-sm text-gray-500 italic">Lecture seule</div>;
        }
        
        return (
          <div className="flex justify-end items-center">
            <Link
              href={`/admin/users/${user._id}/edit`}
              className="text-gray-400 hover:text-white p-2 mr-2 transition-colors"
              title="Modifier"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <DeleteUserButton id={user._id.toString()} />
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-primary-400 p-4 rounded-lg border border-gray-800">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-primary-500 border border-gray-700 rounded-lg text-white text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => handleSort('name')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortConfig.key === 'name' ? 'bg-secondary text-primary' : 'bg-primary-500 text-gray-300 hover:text-white'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Nom {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            onClick={() => handleSort('email')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortConfig.key === 'email' ? 'bg-secondary text-primary' : 'bg-primary-500 text-gray-300 hover:text-white'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            onClick={() => handleSort('role')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortConfig.key === 'role' ? 'bg-secondary text-primary' : 'bg-primary-500 text-gray-300 hover:text-white'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Rôle {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredAndSortedUsers} 
        keyExtractor={(user) => user._id.toString()} 
      />
    </div>
  );
}
