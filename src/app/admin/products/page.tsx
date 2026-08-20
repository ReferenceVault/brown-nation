"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Star } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listProducts, deleteProduct } from "@/lib/api/admin/products";
import { listCategories } from "@/lib/api/admin/categories";
import type { ProductStatus } from "@/lib/types/admin";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { formatINR } from "@/lib/utils/currency";

const COLUMN_COUNT = 7;

const STATUS_OPTIONS: Array<{ label: string; value: ProductStatus | "ALL" }> = [
  { label: "All statuses", value: "ALL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Active", value: "ACTIVE" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProductStatus | "ALL">("ALL");
  const [categoryId, setCategoryId] = useState("");
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  const { data: categoriesData } = useAsync(() => listCategories({ limit: 100 }), []);
  const categories = categoriesData?.items ?? [];

  const {
    data,
    error,
    loading,
    reload,
  } = useAsync(
    () => listProducts({ page, limit: 15, search: search || undefined, status, categoryId: categoryId || undefined }),
    [page, search, status, categoryId],
  );

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteProduct(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this product. It may be referenced by existing orders.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Products</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} product${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Product
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <form onSubmit={onSearchSubmit} className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/40" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, SKU…"
            className="w-full rounded-lg border border-brand-200 bg-white py-2.5 pl-10 pr-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-brand-400"
          />
        </form>

        <Select
          label="Status"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as ProductStatus | "ALL");
          }}
          className="w-44"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>

        <Select
          label="Category"
          value={categoryId}
          onChange={(e) => {
            setPage(1);
            setCategoryId(e.target.value);
          }}
          className="w-48"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-4 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No products found"
            description="Try adjusting your filters, or create a new product."
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((product) => {
                const category = categories.find((c) => c.id === product.categoryId);
                return (
                  <TableRow key={product.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-cover"
                              unoptimized
                            />
                          )}
                        </div>
                        <span className="font-medium text-espresso">{product.name}</span>
                        {product.isBestSeller && (
                          <Star
                            className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                            aria-label="Best seller"
                          />
                        )}
                      </div>
                    </Td>
                    <Td className="font-mono text-xs">{product.sku}</Td>
                    <Td>{category?.name ?? "—"}</Td>
                    <Td>{formatINR(Number(product.price))}</Td>
                    <Td>
                      <span className={product.stockQuantity === 0 ? "font-semibold text-red-500" : ""}>
                        {product.stockQuantity}
                      </span>
                    </Td>
                    <Td>
                      <StatusBadge status={product.status} />
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.75} />
                        </Link>
                        <button
                          onClick={() => setPendingDelete({ id: product.id, name: product.name })}
                          aria-label="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </Td>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {data && <Pagination meta={data.meta} onPageChange={setPage} />}

      <ConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title="Delete product"
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
