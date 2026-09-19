"use client";

import { useEffect, useRef } from "react";
import type { Order } from "@/lib/types/order";
import OrderItemRating from "./OrderItemRating";

/** Matches the "#rate-your-products" fragment the delivery email's rating button links to. */
export const RATE_SECTION_ANCHOR = "rate-your-products";

export default function OrderRatingSection({ order }: { order: Order }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Rating requires a verified purchase (a SUCCESS-paid order containing the
  // product — see ratings.service.ts hasPurchased). A delivered-but-unpaid
  // order fails that check for every item, so gate here too: otherwise this
  // card renders its "Rate your products" heading with nothing underneath.
  const eligible = order.status === "DELIVERED" && order.paymentStatus === "SUCCESS";
  const items = eligible ? (order.items ?? []).filter((item) => item.productId) : [];
  const hasItems = items.length > 0;

  // The delivery email's rating button links straight to this section
  // (#rate-your-products); it mounts after the order finishes loading, so a
  // plain browser anchor-jump on navigation would miss it — scroll manually.
  useEffect(() => {
    if (hasItems && window.location.hash === `#${RATE_SECTION_ANCHOR}`) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasItems]);

  if (!hasItems) return null;

  return (
    <div
      id={RATE_SECTION_ANCHOR}
      ref={sectionRef}
      className="mt-5 rounded-2xl bg-white p-5 shadow-card scroll-mt-20"
    >
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
