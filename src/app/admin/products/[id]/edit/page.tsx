"use client";

import { useParams } from "next/navigation";
import { useAsync } from "@/lib/hooks/useAsync";
import { listCategories } from "@/lib/api/admin/categories";
import { getProduct, updateProduct } from "@/lib/api/admin/products";
import ProductForm from "@/components/admin/ProductForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import { PackageX } from "lucide-react";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();

  const { data: categoriesData, loading: categoriesLoading } = useAsync(
    () => listCategories({ limit: 100 }),
    [],
  );
  const { data: product, error, loading: productLoading } = useAsync(
    () => getProduct(params.id),
    [params.id],
  );

  const loading = categoriesLoading || productLoading;

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Product</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !product) && (
        <div className="mt-6">
          <EmptyState icon={PackageX} title="Product not found" description={error ?? "This product no longer exists."} />
        </div>
      )}

      {!loading && product && categoriesData && (
        <div className="mt-6">
          <ProductForm
            categories={categoriesData.items}
            initialValues={product}
            onSubmit={(data) => updateProduct(product.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
