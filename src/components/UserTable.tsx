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
      render: (user) => <div className="text-sm font-medium text-gray-900">{user.name}</div>
    },
    {
      header: "Email",
      accessorKey: "email",
      render: (user) => <div className="text-sm text-gray-500">{user.email}</div>
    },
    {
      header: "Rôle",
      accessorKey: "role",
      render: (user) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      )
    },
    {
      header: "Date de création",
      render: (user) => (
        <div className="text-sm text-gray-500">
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
            className="text-indigo-600 hover:text-indigo-900 p-2 mr-2"
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
