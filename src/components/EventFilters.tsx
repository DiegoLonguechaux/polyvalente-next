"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Generate years (current year + next 2 years)
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];

  const categories = ['Concert', 'Théâtre', 'Humour', 'Atelier', 'Autre'];

  useEffect(() => {
    const params = new URLSearchParams();
    if (year) params.set("year", year);
    if (category) params.set("category", category);
    
    router.push(`/events?${params.toString()}`);
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
