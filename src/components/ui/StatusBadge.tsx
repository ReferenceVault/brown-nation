const STATUS_STYLES: Record<string, string> = {
  // Product / Category status
  ACTIVE: "bg-pastel-green-soft text-teal-700",
  DRAFT: "bg-pastel-yellow-soft text-amber-800",
  ARCHIVED: "bg-espresso/10 text-espresso/60",
  INACTIVE: "bg-espresso/10 text-espresso/60",

  // User status
  SUSPENDED: "bg-pastel-pink-soft text-rose-700",

  // User role
  ADMIN: "bg-pastel-purple-soft text-purple-700",
  CUSTOMER: "bg-pastel-teal-soft text-teal-700",

  // Order status
  PENDING: "bg-pastel-yellow-soft text-amber-800",
  CONFIRMED: "bg-pastel-teal-soft text-teal-700",
  PROCESSING: "bg-pastel-purple-soft text-purple-700",
  SHIPPED: "bg-pastel-peach-soft text-orange-800",
  DELIVERED: "bg-pastel-green-soft text-teal-700",
  CANCELLED: "bg-pastel-pink-soft text-rose-700",

  // Payment status
  SUCCESS: "bg-pastel-green-soft text-teal-700",
  FAILED: "bg-pastel-pink-soft text-rose-700",
  REFUNDED: "bg-espresso/10 text-espresso/60",
};

export default function StatusBadge({ status }: { status: string }) {
  const classes = STATUS_STYLES[status] ?? "bg-espresso/10 text-espresso/60";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${classes}`}
    >
      {status.toLowerCase()}
    </span>
  );
}
