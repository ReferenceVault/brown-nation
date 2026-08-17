export default function Spinner({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block shrink-0 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-500 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
