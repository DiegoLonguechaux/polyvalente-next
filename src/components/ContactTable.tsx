"use client";

import Table, { Column } from "@/components/Table";
import { Eye, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface ContactTableProps {
  contacts: any[];
}

export default function ContactTable({ contacts: initialContacts }: ContactTableProps) {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!contactToDelete) return;

    try {
      const res = await fetch(`/api/contact/${contactToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== contactToDelete));
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setContactToDelete(null);
    }
  };

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
      render: (contact) => <div className="text-sm font-medium text-white">{contact.firstName} {contact.name}</div>
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
      header: "Objet",
      accessorKey: "subject",
      render: (contact) => (
        <div className="text-sm text-gray-400 max-w-[200px] truncate" title={contact.subject}>
          {contact.subject}
        </div>
      )
    },
    {
      header: "Actions",
      className: "text-right",
      render: (contact) => (
        <div className="flex justify-end items-center gap-2">
          <button 
            onClick={() => setSelectedContact(contact)}
            className="cursor-pointer text-gray-400 hover:text-secondary transition-colors p-1"
            title="Lire le message complet"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setContactToDelete(contact._id)}
            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    },
  ];

  return (
    <>
      <Table 
        columns={columns} 
        data={contacts} 
        keyExtractor={(contact) => contact._id.toString()} 
      />

      {selectedContact && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedContact(null)}>
          <div 
            className="bg-primary-400 border border-gray-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedContact(null)}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Message de {selectedContact.firstName} {selectedContact.name}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                <span>{new Date(selectedContact.createdAt).toLocaleString('fr-FR')}</span>
                <span>•</span>
                <a href={`mailto:${selectedContact.email}`} className="text-secondary hover:underline">
                  {selectedContact.email}
                </a>
              </div>
              <div className="text-sm font-medium text-white bg-primary-500 px-3 py-2 rounded border border-gray-800">
                Objet: {selectedContact.subject}
              </div>
            </div>
            
            <div className="bg-primary-500 p-4 rounded-lg border border-gray-800 text-gray-300 whitespace-pre-wrap max-h-[60vh] overflow-y-auto custom-scrollbar">
              {selectedContact.message}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="cursor-pointer mr-3 px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Fermer
              </button>
              <a 
                href={`mailto:${selectedContact.email}`}
                className="bg-secondary text-primary font-medium px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Répondre par email
              </a>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer le message"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
      />
    </>
  );
}
