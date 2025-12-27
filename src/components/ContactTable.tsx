"use client";

import Table, { Column } from "@/components/Table";

interface ContactTableProps {
  contacts: any[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  const columns: Column<any>[] = [
    {
      header: "Date",
      accessorKey: "createdAt",
      render: (contact) => (
        <div className="text-sm text-gray-400">
          {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )
    },
    {
      header: "Nom",
      accessorKey: "name",
      render: (contact) => <div className="text-sm font-medium text-white">{contact.name}</div>
    },
    {
      header: "Email",
      accessorKey: "email",
      render: (contact) => (
        <a href={`mailto:${contact.email}`} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          {contact.email}
        </a>
      )
    },
    {
      header: "Message",
      accessorKey: "message",
      render: (contact) => (
        <div className="text-sm text-gray-400 max-w-xs truncate" title={contact.message}>
          {contact.message}
        </div>
      )
    },
  ];

  return (
    <Table 
      columns={columns} 
      data={contacts} 
      keyExtractor={(contact) => contact._id.toString()} 
    />
  );
}
