"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const res = await fetch(`/api/users/${id}`, {
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
      className="text-red-600 hover:text-red-800 p-2"
      title="Supprimer"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
