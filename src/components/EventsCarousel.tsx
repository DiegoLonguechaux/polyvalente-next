"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import EventCard from "./EventCard";

interface EventsCarouselProps {
  events: any[];
}

export default function EventsCarousel({ events }: EventsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth; // Scroll one full view width
      const newScrollLeft = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  if (events.length === 0) {
    return <p className="text-gray-500 text-center">Aucun évènement à venir.</p>;
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {events.length > 3 && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-[#1E272C] text-white p-3 rounded-full shadow-lg border border-gray-700 hover:bg-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 scroll-smooth no-scrollbar pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event) => (
          <div 
            key={event._id} 
            className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start flex-shrink-0"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {events.length > 3 && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-[#1E272C] text-white p-3 rounded-full shadow-lg border border-gray-700 hover:bg-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
