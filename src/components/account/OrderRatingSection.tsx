import type { Order } from "@/lib/types/order";
import OrderItemRating from "./OrderItemRating";

export default function OrderRatingSection({ order }: { order: Order }) {
  if (order.status !== "DELIVERED") return null;

  const items = (order.items ?? []).filter((item) => item.productId);
  if (items.length === 0) return null;

  return (
    <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
      <p className="text-sm font-semibold text-espresso">Rate your products</p>
      <div className="mt-1 divide-y divide-brand-100">
        {items.map((item) => (
          <OrderItemRating
            key={item.id}
            productId={item.productId!}
            productName={item.productName}
            productSlug={item.product?.slug ?? null}
            productImage={item.product?.images[0] ?? null}
          />
        ))}
      </div>
    </div>
  );
}
