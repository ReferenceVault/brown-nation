import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  from: string;
  to: string;
  icon?: LucideIcon;
  className?: string;
  label?: string;
};

export default function ImagePlaceholder({
  from,
  to,
  icon: Icon = ImageIcon,
  className = "",
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden ${className}`}
      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
      <Icon className="relative h-7 w-7 text-white/70" strokeWidth={1.5} />
      {label && (
        <span className="relative text-[11px] font-medium uppercase tracking-wider text-white/60">
          {label}
        </span>
      )}
    </div>
  );
}
