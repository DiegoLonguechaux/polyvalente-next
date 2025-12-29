"use client";

import { MessageSquare, Send, User } from "lucide-react";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  eventId: string;
}

export default function CommentSection({ eventId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ author: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?eventId=${eventId}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.content.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventId }),
      });

      if (res.ok) {
        setFormData({ author: "", content: "" });
        fetchComments(); // Refresh list
      } else {
        setError("Erreur lors de l'envoi du commentaire");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 max-w-3xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <MessageSquare className="text-secondary" />
        Commentaires ({comments.length})
      </h3>

      {/* List */}
      <div className="space-y-6 mb-10">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Chargement des commentaires...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8 italic bg-primary-400/30 rounded-lg">
            Soyez le premier à commenter cet évènement !
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-primary-400 p-6 rounded-xl border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{comment.author}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap pl-13">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Form */}
      <div className="bg-primary-500 p-6 rounded-xl border border-gray-800">
        <h4 className="text-lg font-medium text-white mb-4">Laisser un commentaire</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-400 text-sm">{error}</div>}
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-400 mb-1">Votre nom</label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full bg-primary-400 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
              placeholder="Jean Dupont"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">Votre message</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-primary-400 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors min-h-[100px]"
              placeholder="Super évènement !"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer bg-secondary text-primary font-bold px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Envoi..." : "Publier"}
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
}
