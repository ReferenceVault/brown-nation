import type { Order } from "@/lib/types/order";
import { formatINR } from "@/lib/utils/currency";

export default function OrderDetailCard({ order }: { order: Order }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex flex-col gap-3">
        {(order.items ?? []).map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-espresso line-clamp-1">{item.productName}</p>
              <p className="text-xs text-espresso/50">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-espresso">{formatINR(Number(item.totalPrice))}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-brand-100 pt-4 text-sm">
        <div className="flex justify-between text-espresso/70">
          <span>Subtotal</span>
          <span className="font-medium text-espresso">{formatINR(Number(order.subtotal))}</span>
        </div>
        <div className="flex justify-between text-espresso/70">
          <span>Shipping</span>
          <span className="font-medium text-espresso">
            {Number(order.shippingAmount) === 0 ? "Free" : formatINR(Number(order.shippingAmount))}
          </span>
        </div>
        <div className="flex justify-between border-t border-brand-100 pt-2.5 text-base font-bold text-espresso">
          <span>Total Paid</span>
          <span>{formatINR(Number(order.totalAmount))}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-100 pt-4 text-sm text-espresso/70">
        <p className="font-semibold text-espresso">Shipping to</p>
        <p className="mt-1">{order.shippingAddress.fullName}</p>
        <p>
          {order.shippingAddress.line1}
          {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
        </p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
        </p>
      </div>
    </div>
  );
}
