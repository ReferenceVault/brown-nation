import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Order } from "@/lib/types/order";
import { formatINR } from "@/lib/utils/currency";
import StatusBadge from "@/components/ui/StatusBadge";

export default function OrderCard({ order }: { order: Order }) {
  const itemCount = (order.items ?? []).reduce((sum, item) => sum + item.quantity, 0);
  const placedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-espresso">#{order.orderNumber}</p>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-xs text-espresso/50">
          {placedDate} · {itemCount} item{itemCount > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-bold text-espresso">{formatINR(Number(order.totalAmount))}</p>
        <ChevronRight className="h-4 w-4 text-espresso/30" strokeWidth={2} />
      </div>
    </Link>
  );
}
