import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  size?: number;
};

export default function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.5}
            className={i < Math.round(rating) ? "fill-brand-500 text-brand-500" : "fill-none text-espresso/20"}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-espresso/60">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount})`}
      </span>
    </div>
  );
}
