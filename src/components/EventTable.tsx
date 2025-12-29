"use client";

import DeleteEventButton from "@/components/DeleteEventButton";
import Table, { Column } from "@/components/Table";
import { ArrowUpDown, Edit, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface EventTableProps {
  events: any[];
}

export default function EventTable({ events }: EventTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'asc' });

  const filteredAndSortedEvents = useMemo(() => {
    let processed = [...events];

    // Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(event => 
        event.title.toLowerCase().includes(lowerTerm) ||
        event.location.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    processed.sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    return processed;
  }, [events, searchTerm, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const columns: Column<any>[] = [
    {
      header: "Titre",
      accessorKey: "title",
      render: (event) => <div className="text-sm font-medium text-white">{event.title}</div>
    },
    {
      header: "Date",
      render: (event) => (
        <div className="text-sm text-gray-400">
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      header: "Lieu",
      accessorKey: "location",
      render: (event) => <div className="text-sm text-gray-400">{event.location}</div>
    },
    {
      header: "Actions",
      className: "text-right",
      render: (event) => (
        <div className="flex justify-end items-center">
          <Link
            href={`/admin/events/${event._id}/edit`}
            className="text-gray-400 hover:text-white p-2 mr-2 transition-colors"
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
            onClick={() => handleSort('date')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortConfig.key === 'date' ? 'bg-secondary text-primary' : 'bg-primary-500 text-gray-300 hover:text-white'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            onClick={() => handleSort('title')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortConfig.key === 'title' ? 'bg-secondary text-primary' : 'bg-primary-500 text-gray-300 hover:text-white'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Titre {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredAndSortedEvents} 
        keyExtractor={(event) => event._id.toString()} 
      />
    </div>
  );
}
