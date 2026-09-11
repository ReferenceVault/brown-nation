"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Megaphone, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listPromoBanners, deletePromoBanner } from "@/lib/api/admin/promoBanners";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 4;

export default function AdminPromoBannersPage() {
  const { data, error, loading, reload } = useAsync(() => listPromoBanners({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deletePromoBanner(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this promo banner.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Promo Banners</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} banner${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/promo-banners/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Banner
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Megaphone}
            title="No promo banners yet"
            description="Create a banner to advertise an offer on the homepage."
            actionLabel="New Banner"
            actionHref="/admin/promo-banners/new"
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Banner</Th>
                <Th>Coupon</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((banner) => (
                <TableRow key={banner.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                        {banner.image && (
                          <Image
                            src={banner.image}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-espresso">{banner.heading}</p>
                        <p className="text-xs text-espresso/50">{banner.eyebrow}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-espresso/70">{banner.couponCode ?? "—"}</Td>
                  <Td>
                    <StatusBadge status={banner.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/promo-banners/${banner.id}/edit`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() => setPendingDelete({ id: banner.id, title: banner.heading })}
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
        title="Delete promo banner"
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
