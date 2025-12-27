"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#151A1E]">
      <div className="bg-[#1E272C] p-8 rounded-xl border border-gray-800 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Connexion Admin</h1>
        
        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#151A1E] border border-gray-700 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#151A1E] border border-gray-700 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
