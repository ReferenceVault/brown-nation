"use client";

import { useParams } from "next/navigation";
import { ImageOff } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getPromoBanner, updatePromoBanner } from "@/lib/api/admin/promoBanners";
import PromoBannerForm from "@/components/admin/PromoBannerForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default function EditPromoBannerPage() {
  const params = useParams<{ id: string }>();
  const { data: banner, error, loading } = useAsync(() => getPromoBanner(params.id), [params.id]);

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Promo Banners", href: "/admin/promo-banners" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Promo Banner</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !banner) && (
        <div className="mt-6">
          <EmptyState
            icon={ImageOff}
            title="Promo banner not found"
            description={error ?? "This promo banner no longer exists."}
          />
        </div>
      )}

      {!loading && banner && (
        <div className="mt-6">
          <PromoBannerForm
            initialValues={banner}
            onSubmit={(data) => updatePromoBanner(banner.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
