import type { Order } from "@/lib/types/order";
import OrderItemRating from "./OrderItemRating";

export default function OrderRatingSection({ order }: { order: Order }) {
  // Rating requires a verified purchase (a SUCCESS-paid order containing the
  // product — see ratings.service.ts hasPurchased). A delivered-but-unpaid
  // order fails that check for every item, so gate here too: otherwise this
  // card renders its "Rate your products" heading with nothing underneath.
  if (order.status !== "DELIVERED" || order.paymentStatus !== "SUCCESS") return null;

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
