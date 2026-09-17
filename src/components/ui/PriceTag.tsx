import { formatINR, formatINRRange } from "@/lib/utils/currency";

type PriceTagProps = {
  price: number;
  // Highest price across a product's cavity/bar options, when it has any —
  // renders as a "min – max" range instead of a single price.
  maxPrice?: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export default function PriceTag({ price, maxPrice, compareAtPrice, size = "md" }: PriceTagProps) {
  if (maxPrice !== undefined && maxPrice > price) {
    return (
      <span
        className={`inline-flex items-baseline whitespace-nowrap font-bold text-brand-600 ${sizes[size]}`}
      >
        {formatINRRange(price, maxPrice)}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-2 font-bold text-brand-600 ${sizes[size]}`}>
      {formatINR(price)}
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-xs font-medium text-espresso/40 line-through">
          {formatINR(compareAtPrice)}
        </span>
      )}
    </span>
  );
}
