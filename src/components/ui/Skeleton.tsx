import type { CSSProperties } from "react";

export default function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`animate-shimmer rounded-md bg-gradient-to-r from-brand-100 via-cream-100 to-brand-100 ${className}`}
      style={style}
    />
  );
}
