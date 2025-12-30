"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Generate years from 2021 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2021 + 1 }, (_, i) => 2021 + i).reverse();

  const categories = ['Concert', 'Théâtre', 'Humour', 'Atelier', 'Autre'];

  useEffect(() => {
    const params = new URLSearchParams();
    if (year) params.set("year", year);
    if (category) params.set("category", category);
    
    router.push(`/evenements?${params.toString()}`);
  }, [year, category, router]);

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border border-secondary text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block p-2.5"
      >
        <option value="">Toutes les années</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-secondary text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block p-2.5"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
