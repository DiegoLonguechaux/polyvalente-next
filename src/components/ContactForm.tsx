"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {status === "success" && (
        <div className="bg-green-900/50 border border-green-800 text-green-200 px-4 py-3 rounded">
          Message envoyé avec succès ! Nous vous répondrons bientôt.
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded">
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">Prénom</label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-3 border"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nom</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-3 border"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-3 border"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Objet</label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-3 border"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-3 border"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer w-full bg-secondary text-primary font-bold px-4 py-3 rounded hover:bg-secondary-200 disabled:opacity-50 transition-colors uppercase tracking-wide"
      >
        {status === "submitting" ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}
