"use client";

import DeleteEventButton from "@/components/DeleteEventButton";
import Table, { Column } from "@/components/Table";
import { Edit } from "lucide-react";
import Link from "next/link";

interface EventTableProps {
  events: any[];
}

export default function EventTable({ events }: EventTableProps) {
  const columns: Column<any>[] = [
    {
      header: "Titre",
      accessorKey: "title",
      render: (event) => <div className="text-sm font-medium text-gray-900">{event.title}</div>
    },
    {
      header: "Date",
      render: (event) => (
        <div className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      header: "Lieu",
      accessorKey: "location",
      render: (event) => <div className="text-sm text-gray-500">{event.location}</div>
    },
    {
      header: "Actions",
      className: "text-right",
      render: (event) => (
        <div className="flex justify-end items-center">
          <Link
            href={`/admin/events/${event._id}/edit`}
            className="text-indigo-600 hover:text-indigo-900 p-2 mr-2"
            title="Modifier"
          >
            <Edit className="w-5 h-5" />
          </Link>
          <DeleteEventButton id={event._id.toString()} />
        </div>
      )
    }
  ];

  return (
    <Table 
      columns={columns} 
      data={events} 
      keyExtractor={(event) => event._id.toString()} 
    />
  );
}
