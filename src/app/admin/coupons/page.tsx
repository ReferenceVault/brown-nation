"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Tag, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listCoupons, deleteCoupon } from "@/lib/api/admin/coupons";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { formatINR } from "@/lib/utils/currency";

const COLUMN_COUNT = 6;

function formatDiscount(coupon: { discountType: string; discountValue: string }) {
  return coupon.discountType === "PERCENTAGE"
    ? `${Number(coupon.discountValue)}% off`
    : `${formatINR(Number(coupon.discountValue))} off`;
}

function formatValidity(coupon: { startsAt: string | null; expiresAt: string | null }) {
  if (!coupon.startsAt && !coupon.expiresAt) return "Always";
  const start = coupon.startsAt ? new Date(coupon.startsAt).toLocaleDateString("en-IN") : "—";
  const end = coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString("en-IN") : "—";
  return `${start} – ${end}`;
}

export default function AdminCouponsPage() {
  const { data, error, loading, reload } = useAsync(() => listCoupons({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteCoupon(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this coupon.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Coupons</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} coupon${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Coupon
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="No coupons yet"
            description="Create a coupon to let customers apply a discount at checkout."
            actionLabel="New Coupon"
            actionHref="/admin/coupons/new"
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Code</Th>
                <Th>Discount</Th>
                <Th>Min. Order</Th>
                <Th>Validity</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((coupon) => (
                <TableRow key={coupon.id}>
                  <Td className="font-mono font-semibold text-espresso">{coupon.code}</Td>
                  <Td className="text-espresso/70">{formatDiscount(coupon)}</Td>
                  <Td className="text-espresso/70">
                    {coupon.minOrderAmount ? formatINR(Number(coupon.minOrderAmount)) : "—"}
                  </Td>
                  <Td className="text-espresso/70">{formatValidity(coupon)}</Td>
                  <Td>
                    <StatusBadge status={coupon.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/coupons/${coupon.id}/edit`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() => setPendingDelete({ id: coupon.id, title: coupon.code })}
                        aria-label="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title="Delete coupon"
        description={
          <>
            Delete <span className="font-semibold text-espresso">{pendingDelete?.title}</span>? This
            cannot be undone.
          </>
        }
      />
    </div>
  );
}
