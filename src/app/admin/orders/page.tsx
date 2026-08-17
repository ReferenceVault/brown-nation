"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listOrders } from "@/lib/api/admin/orders";
import type { AdminOrderStatus } from "@/lib/types/admin";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { formatINR } from "@/lib/utils/currency";

const COLUMN_COUNT = 7;

const STATUS_OPTIONS: Array<{ label: string; value: AdminOrderStatus | "" }> = [
  { label: "All statuses", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AdminOrderStatus | "">("");

  const { data, error, loading } = useAsync(
    () => listOrders({ page, limit: 15, status: status || undefined }),
    [page, status],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Orders</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} order${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>

        <Select
          label="Status"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as AdminOrderStatus | "");
          }}
          className="w-48"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="No orders found" description="Try a different filter." />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((order) => (
                <TableRow key={order.id}>
                  <Td className="font-mono text-xs font-medium text-espresso">{order.orderNumber}</Td>
                  <Td>
                    {order.user ? (
                      <div>
                        <p className="text-espresso">
                          {order.user.firstName} {order.user.lastName}
                        </p>
                        <p className="text-xs text-espresso/50">{order.user.email}</p>
                      </div>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td className="text-xs text-espresso/60">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Td>
                  <Td className="font-semibold">{formatINR(Number(order.totalAmount))}</Td>
                  <Td>
                    <StatusBadge status={order.paymentStatus} />
                  </Td>
                  <Td>
                    <StatusBadge status={order.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        aria-label="View"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {data && <Pagination meta={data.meta} onPageChange={setPage} />}
    </div>
  );
}
