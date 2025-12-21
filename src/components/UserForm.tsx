"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserFormProps {
  initialData?: {
    _id?: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function UserForm({ initialData }: UserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    role: initialData?.role || "admin",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const url = initialData?._id 
      ? `/api/users/${initialData._id}` 
      : "/api/users";
    
    const method = initialData?._id ? "PUT" : "POST";

    // Don't send empty password on update
    const bodyData: any = { ...formData };
    if (initialData?._id && !bodyData.password) {
      delete bodyData.password;
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      setMessage(initialData ? "Utilisateur modifié avec succès" : "Utilisateur créé avec succès");
      if (!initialData) {
        setFormData({ name: "", email: "", password: "", role: "admin" });
      }
      router.push("/admin/users");
      router.refresh();
    } else {
      const data = await res.json();
      setMessage(`Erreur: ${data.error}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Modifier l'utilisateur" : "Ajouter un nouvel utilisateur"}
      </h2>
      
      {message && (
        <div className={`p-4 rounded mb-4 ${message.includes("Erreur") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {initialData ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            required={!initialData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          {initialData ? "Modifier" : "Créer l'utilisateur"}
        </button>
      </form>
    </div>
  );
}
