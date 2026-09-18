import { Star } from "lucide-react";

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
};

export default function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = sizes[size];
  // Snap to the nearest half star. Clipping the whole row by a raw fractional
  // percentage (e.g. 74%) lands mid-icon at an arbitrary point, which cuts
  // through a star's points/notches and renders as a broken shape instead of
  // a clean half star — so each star below is clipped individually at 0/50/100%.
  const rounded = Math.round(Math.max(0, Math.min(5, rating)) * 2) / 2;

  return (
    <div className="inline-flex gap-0.5 self-start">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rounded - i)) * 100;
        return (
          <div key={i} className="relative">
            <Star className={`${starSize} text-espresso/15`} fill="currentColor" strokeWidth={0} />
            {fill > 0 && (
              <div
                className="absolute inset-y-0 left-0 overflow-hidden text-amber-400"
                style={{ width: `${fill}%` }}
              >
                <Star className={starSize} fill="currentColor" strokeWidth={0} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
