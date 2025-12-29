"use client";

import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="bg-primary-400 p-8 rounded-xl border border-gray-800 mb-8">
      <h2 className="text-xl font-bold mb-6 text-secondary">
        {initialData ? "Modifier l'utilisateur" : "Ajouter un nouvel utilisateur"}
      </h2>
      
      {message && (
        <div className={`p-4 rounded mb-4 ${message.includes("Erreur") ? "bg-red-900/50 border border-red-800 text-red-200" : "bg-green-900/50 border border-green-800 text-green-200"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Nom</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2.5 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2.5 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            {initialData ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2.5 border pr-10"
              required={!initialData}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Rôle</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-700 bg-primary-500 text-white shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2.5 border"
          >
            <option value="admin">Administrateur</option>
            <option value="super_admin">Super Administrateur</option>
          </select>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer bg-primary-200 text-white px-4 py-2 rounded-lg mr-3 hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-secondary text-primary font-medium px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {initialData ? "Modifier" : "Créer l'utilisateur"}
          </button>
        </div>
      </form>
    </div>
  );
}
