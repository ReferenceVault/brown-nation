import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselArrowProps = {
  direction: "left" | "right";
  onClick?: () => void;
  className?: string;
};

export default function CarouselArrow({
  direction,
  onClick,
  className = "",
}: CarouselArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-espresso shadow-card transition-all duration-300 hover:bg-brand-500 hover:text-white hover:scale-105 cursor-pointer ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
