"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PackageX, Printer, Copy, Check } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getOrder } from "@/lib/api/admin/orders";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import OrderStatusActions from "@/components/admin/OrderStatusActions";
import { formatINR } from "@/lib/utils/currency";

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: order, error, loading, reload } = useAsync(() => getOrder(params.id), [params.id]);
  const [copied, setCopied] = useState(false);

  const copyOrderNumber = () => {
    if (!order) return;
    void navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <p className="text-sm text-espresso/50">Loading…</p>;

  if (error || !order) {
    return (
      <EmptyState icon={PackageX} title="Order not found" description={error ?? "This order no longer exists."} />
    );
  }

  const address = order.shippingAddress;
  const billing = order.billingAddress;
  const sameAddress = JSON.stringify(address) === JSON.stringify(billing);

  return (
    <div className="max-w-4xl">
      <div className="print:hidden">
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Orders", href: "/admin/orders" },
            { label: order.orderNumber },
          ]}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-espresso">{order.orderNumber}</h1>
            <button
              type="button"
              onClick={copyOrderNumber}
              aria-label="Copy order number"
              className="text-espresso/40 transition-colors duration-200 hover:text-brand-500 print:hidden"
            >
              {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
            </button>
          </div>
          <p className="mt-1 text-sm text-espresso/60">
            Placed{" "}
            {new Date(order.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            by {order.user ? `${order.user.firstName} ${order.user.lastName} (${order.user.email})` : "—"}
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-brand-200 px-3.5 py-2 text-sm font-medium text-espresso/70 transition-colors duration-200 hover:bg-brand-50"
          >
            <Printer className="h-4 w-4" strokeWidth={1.75} />
            Print
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-card print:shadow-none print:p-0">
            <h2 className="font-serif text-lg font-semibold text-espresso">Items</h2>
            <div className="mt-3 divide-y divide-brand-100/70">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-espresso">{item.productName}</p>
                    <p className="text-xs text-espresso/50">
                      SKU {item.sku} · Qty {item.quantity} × {formatINR(Number(item.unitPrice))}
                    </p>
                  </div>
                  <p className="font-semibold text-espresso">{formatINR(Number(item.totalPrice))}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-brand-100 pt-4 text-sm">
              <div className="flex justify-between text-espresso/70">
                <span>Subtotal</span>
                <span>{formatINR(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-espresso/70">
                  <span>Discount</span>
                  <span>-{formatINR(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between text-espresso/70">
                <span>Shipping</span>
                <span>{Number(order.shippingAmount) === 0 ? "Free" : formatINR(Number(order.shippingAmount))}</span>
              </div>
              {Number(order.taxAmount) > 0 && (
                <div className="flex justify-between text-espresso/70">
                  <span>Tax</span>
                  <span>{formatINR(Number(order.taxAmount))}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-brand-100 pt-1.5 text-base font-bold text-espresso">
                <span>Total</span>
                <span>{formatINR(Number(order.totalAmount))}</span>
              </div>
            </div>
          </div>

          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-card print:hidden">
              <h2 className="font-serif text-lg font-semibold text-espresso">Status History</h2>
              <div className="mt-3 flex flex-col gap-3">
                {order.statusHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 text-sm">
                    <StatusBadge status={entry.status} />
                    <div>
                      {entry.note && <p className="text-espresso/70">{entry.note}</p>}
                      <p className="text-xs text-espresso/40">
                        {new Date(entry.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-white p-5 shadow-card print:shadow-none print:p-0">
            <h2 className="font-serif text-lg font-semibold text-espresso">Shipping Address</h2>
            <address className="mt-2 text-sm not-italic text-espresso/70">
              {address.fullName}
              <br />
              {address.line1}
              {address.line2 && (
                <>
                  <br />
                  {address.line2}
                </>
              )}
              <br />
              {address.city}, {address.state} {address.postalCode}
              <br />
              {address.phone}
            </address>

            {!sameAddress && (
              <>
                <h2 className="mt-4 font-serif text-lg font-semibold text-espresso">Billing Address</h2>
                <address className="mt-2 text-sm not-italic text-espresso/70">
                  {billing.fullName}
                  <br />
                  {billing.line1}
                  {billing.line2 && (
                    <>
                      <br />
                      {billing.line2}
                    </>
                  )}
                  <br />
                  {billing.city}, {billing.state} {billing.postalCode}
                  <br />
                  {billing.phone}
                </address>
              </>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card print:hidden">
            <h2 className="font-serif text-lg font-semibold text-espresso">Update Status</h2>
            <div className="mt-3">
              <OrderStatusActions order={order} onChanged={reload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
