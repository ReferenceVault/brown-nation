"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Sparkles, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listHeroSlides, deleteHeroSlide } from "@/lib/api/admin/heroSlides";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 5;

export default function AdminHeroSlidesPage() {
  const { data, error, loading, reload } = useAsync(() => listHeroSlides({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteHeroSlide(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this hero slide.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Homepage Hero</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} slide${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Slide
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No hero slides yet"
            description="Add a slide to control what shows in the homepage hero banner."
            actionLabel="New Slide"
            actionHref="/admin/hero-slides/new"
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Slide</Th>
                <Th>Order</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((slide) => (
                <TableRow key={slide.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                        <Image
                          src={slide.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-medium text-espresso">
                          {slide.headingLine1} {slide.headingLine2}
                        </p>
                        <p className="text-xs text-espresso/50">{slide.eyebrow}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-espresso/70">{slide.order}</Td>
                  <Td>
                    <StatusBadge status={slide.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/hero-slides/${slide.id}/edit`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() =>
                          setPendingDelete({ id: slide.id, title: `${slide.headingLine1} ${slide.headingLine2}` })
                        }
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
        title="Delete hero slide"
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
