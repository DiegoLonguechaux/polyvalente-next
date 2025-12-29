"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EventGalleryProps {
  images: string[];
}

export default function EventGallery({ images }: EventGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-6 pt-8">
      <h2 className="text-2xl font-bold text-secondary uppercase tracking-wider border-l-4 border-secondary pl-4">
        Galerie
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={img}
              alt={`Galerie ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[selectedIndex]}
              alt={`Galerie ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
            aria-label="Suivant"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
