"use client";

import { createPromoBanner } from "@/lib/api/admin/promoBanners";
import PromoBannerForm from "@/components/admin/PromoBannerForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewPromoBannerPage() {
  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Promo Banners", href: "/admin/promo-banners" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Promo Banner</h1>

      <div className="mt-6">
        <PromoBannerForm onSubmit={createPromoBanner} submitLabel="Create Banner" />
      </div>
    </div>
  );
}
