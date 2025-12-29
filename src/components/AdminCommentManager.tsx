"use client";

import { Eye, EyeOff, MessageSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  isVisible: boolean;
}

interface AdminCommentManagerProps {
  eventId: string;
}

export default function AdminCommentManager({ eventId }: AdminCommentManagerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?eventId=${eventId}&all=true`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  const handleDelete = async () => {
    if (!commentToDelete) return;

    try {
      const res = await fetch(`/api/comments/${commentToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments(comments.filter(c => c._id !== commentToDelete));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setCommentToDelete(null);
    }
  };

  const toggleVisibility = async (comment: Comment) => {
    try {
      const res = await fetch(`/api/comments/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: !comment.isVisible }),
      });

      if (res.ok) {
        const updatedComment = await res.json();
        setComments(comments.map(c => c._id === updatedComment._id ? updatedComment : c));
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (loading) return <div className="text-gray-400">Chargement des commentaires...</div>;

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare className="text-secondary" />
        Gestion des commentaires ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <div className="bg-primary-500 p-6 rounded-lg border border-gray-800 text-center text-gray-500">
          Aucun commentaire pour cet évènement.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div 
              key={comment._id} 
              className={`p-4 rounded-lg border ${
                comment.isVisible 
                  ? "bg-primary-500 border-gray-800" 
                  : "bg-red-900/10 border-red-900/30"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{comment.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString('fr-FR')}
                    </span>
                    {!comment.isVisible && (
                      <span className="flex items-center gap-1 text-xs text-red-400 bg-red-900/20 px-2 py-0.5 rounded-full border border-red-900/30">
                        <EyeOff className="w-3 h-3" /> Masqué
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(comment)}
                    className={`cursor-pointer p-2 rounded-lg transition-colors ${
                      comment.isVisible 
                        ? "text-gray-400 hover:text-white hover:bg-gray-800" 
                        : "text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    }`}
                    title={comment.isVisible ? "Masquer le commentaire" : "Afficher le commentaire"}
                  >
                    {comment.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setCommentToDelete(comment._id)}
                    className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Supprimer définitivement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer le commentaire"
        message="Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est irréversible."
      />
    </div>
  );
}
