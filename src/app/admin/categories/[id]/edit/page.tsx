"use client";

import { useParams } from "next/navigation";
import { FolderX } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getCategory, updateCategory } from "@/lib/api/admin/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const { data: category, error, loading } = useAsync(() => getCategory(params.id), [params.id]);

  return (
    <div className="max-w-xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Categories", href: "/admin/categories" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Category</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !category) && (
        <div className="mt-6">
          <EmptyState
            icon={FolderX}
            title="Category not found"
            description={error ?? "This category no longer exists."}
          />
        </div>
      )}

      {!loading && category && (
        <div className="mt-6">
          <CategoryForm
            initialValues={category}
            onSubmit={(data) => updateCategory(category.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
