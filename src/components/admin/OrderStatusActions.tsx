"use client";

import { useState } from "react";
import { ALLOWED_ORDER_STATUS_TRANSITIONS, type AdminOrder, type AdminOrderStatus } from "@/lib/types/admin";
import { updateOrderStatus } from "@/lib/api/admin/orders";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const ACTION_LABELS: Record<AdminOrderStatus, string> = {
  PENDING: "Mark Pending",
  CONFIRMED: "Confirm Order",
  PROCESSING: "Start Processing",
  SHIPPED: "Mark Shipped",
  DELIVERED: "Mark Delivered",
  CANCELLED: "Cancel Order",
};

export default function OrderStatusActions({
  order,
  onChanged,
}: {
  order: AdminOrder;
  onChanged: () => void;
}) {
  const [pendingStatus, setPendingStatus] = useState<AdminOrderStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const showToast = useToastStore((state) => state.show);

  const nextStatuses = ALLOWED_ORDER_STATUS_TRANSITIONS[order.status];

  if (nextStatuses.length === 0) {
    return <p className="text-sm text-espresso/50">This order is in a final state.</p>;
  }

  const applyStatus = async (status: AdminOrderStatus) => {
    setPendingStatus(status);
    setError(null);
    try {
      await updateOrderStatus(order.id, status);
      showToast("Order updated successfully.");
      onChanged();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPendingStatus(null);
    }
  };

  const handleClick = (status: AdminOrderStatus) => {
    if (status === "CANCELLED") {
      setConfirmingCancel(true);
      return;
    }
    applyStatus(status);
  };

  const confirmCancel = async () => {
    await updateOrderStatus(order.id, "CANCELLED");
    showToast("Order updated successfully.");
    onChanged();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <button
            key={status}
            type="button"
            disabled={pendingStatus !== null}
            onClick={() => handleClick(status)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
              status === "CANCELLED"
                ? "border border-red-300 text-red-600 hover:bg-red-50"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            {pendingStatus === status ? "Saving…" : ACTION_LABELS[status]}
          </button>
        ))}
      </div>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <ConfirmDialog
        open={confirmingCancel}
        onClose={() => setConfirmingCancel(false)}
        onConfirm={confirmCancel}
        title="Cancel order"
        description="Cancel this order? Reserved stock will be released."
        confirmLabel="Cancel Order"
        cancelLabel="Keep Order"
      />
    </div>
  );
}
