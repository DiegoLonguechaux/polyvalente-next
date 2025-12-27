"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet évènement ?")) {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-300 p-2 transition-colors"
      title="Supprimer"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
