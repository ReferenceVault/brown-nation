"use client";

import { createCategory } from "@/lib/api/admin/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Categories", href: "/admin/categories" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Category</h1>

      <div className="mt-6">
        <CategoryForm onSubmit={createCategory} submitLabel="Create Category" />
      </div>
    </div>
  );
}
