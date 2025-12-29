"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function DeleteUserButton({ id }: { id: string }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-400 hover:text-red-300 p-2 transition-colors"
        title="Supprimer"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
        isDestructive={true}
      />
    </>
  );
}
