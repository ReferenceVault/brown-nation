"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRatingInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div className="inline-flex gap-1" onMouseLeave={() => setHovered(null)}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className="transition-transform duration-150 disabled:cursor-not-allowed cursor-pointer hover:scale-110"
        >
          <Star
            className={`h-6 w-6 ${star <= display ? "text-amber-400" : "text-espresso/20"}`}
            fill="currentColor"
            strokeWidth={0}
          />
        </button>
      ))}
    </div>
  );
}
