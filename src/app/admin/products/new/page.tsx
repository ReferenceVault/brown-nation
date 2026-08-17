"use client";

import Link from "next/link";
import { useAsync } from "@/lib/hooks/useAsync";
import { listCategories } from "@/lib/api/admin/categories";
import { createProduct } from "@/lib/api/admin/products";
import ProductForm from "@/components/admin/ProductForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewProductPage() {
  const { data, loading } = useAsync(() => listCategories({ limit: 100 }), []);

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Product</h1>

      {loading ? (
        <p className="mt-6 text-sm text-espresso/50">Loading…</p>
      ) : !data?.items.length ? (
        <p className="mt-6 text-sm text-espresso/60">
          You need at least one category before creating a product.{" "}
          <Link href="/admin/categories/new" className="font-semibold text-brand-600 hover:underline">
            Create a category
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6">
          <ProductForm categories={data.items} onSubmit={createProduct} submitLabel="Create Product" />
        </div>
      )}
    </div>
  );
}
