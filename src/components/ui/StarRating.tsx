import { Star } from "lucide-react";

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
};

export default function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = sizes[size];
  const percentage = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="relative inline-flex">
      <div className="flex gap-0.5 text-espresso/15">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={starSize} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <div
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-amber-400"
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={starSize} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
    </div>
  );
}
