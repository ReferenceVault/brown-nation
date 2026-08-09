import { formatINR } from "@/lib/utils/currency";

type PriceTagProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export default function PriceTag({ price, compareAtPrice, size = "md" }: PriceTagProps) {
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
