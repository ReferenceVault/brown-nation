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

// A "min – max" range is a longer string than a single price, so it renders
// a size step down to keep it on one line in tight card layouts.
const rangeSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
};

export default function PriceTag({ price, maxPrice, compareAtPrice, size = "md" }: PriceTagProps) {
  if (maxPrice !== undefined && maxPrice > price) {
    return (
      <span
        className={`inline-flex items-baseline whitespace-nowrap font-bold text-brand-600 ${rangeSizes[size]}`}
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
