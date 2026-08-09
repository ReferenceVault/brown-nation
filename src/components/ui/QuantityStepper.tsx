import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export default function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantityStepperProps) {
  const buttonSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center rounded-lg border border-brand-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={`flex ${buttonSize} items-center justify-center rounded-l-lg text-espresso transition-colors duration-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer`}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <span className={`w-8 text-center font-semibold text-espresso ${textSize}`}>{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className={`flex ${buttonSize} items-center justify-center rounded-r-lg text-espresso transition-colors duration-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
