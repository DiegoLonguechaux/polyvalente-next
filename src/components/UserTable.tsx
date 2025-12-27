"use client";

import DeleteUserButton from "@/components/DeleteUserButton";
import Table, { Column } from "@/components/Table";
import { Edit } from "lucide-react";
import Link from "next/link";

interface UserTableProps {
  users: any[];
}

export default function UserTable({ users }: UserTableProps) {
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
      render: (user) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'admin' 
            ? 'bg-secondary/20 text-secondary border border-secondary/30' 
            : 'bg-gray-700 text-gray-300 border border-gray-600'
        }`}>
          {user.role === 'admin' ? 'Admin' : 'Bénévole'}
        </span>
      )
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
      render: (user) => (
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
      )
    }
  ];

  return (
    <Table 
      columns={columns} 
      data={users} 
      keyExtractor={(user) => user._id.toString()} 
    />
  );
}
