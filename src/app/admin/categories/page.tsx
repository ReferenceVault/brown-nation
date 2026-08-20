"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, FolderTree, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listCategories, deleteCategory } from "@/lib/api/admin/categories";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 5;

export default function AdminCategoriesPage() {
  const { data, error, loading, reload } = useAsync(() => listCategories({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteCategory(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this category. It may still have products assigned to it.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Categories</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} categor${data.meta.totalItems === 1 ? "y" : "ies"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Category
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={FolderTree}
            title="No categories yet"
            description="Create your first category to start organizing products."
            actionLabel="New Category"
            actionHref="/admin/categories/new"
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Category</Th>
                <Th>Slug</Th>
                <Th>Order</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((category) => (
                <TableRow key={category.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                        {category.image && (
                          <Image
                            src={category.image}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <span className="font-medium text-espresso">{category.name}</span>
                    </div>
                  </Td>
                  <Td className="font-mono text-xs text-espresso/60">{category.slug}</Td>
                  <Td className="text-espresso/70">{category.order}</Td>
                  <Td>
                    <StatusBadge status={category.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() => setPendingDelete({ id: category.id, name: category.name })}
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
        title="Delete category"
        description={
          <>
            Delete <span className="font-semibold text-espresso">{pendingDelete?.name}</span>? This
            cannot be undone.
          </>
        }
      />
    </div>
  );
}
