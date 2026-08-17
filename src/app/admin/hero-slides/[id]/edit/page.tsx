"use client";

import { useParams } from "next/navigation";
import { ImageOff } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getHeroSlide, updateHeroSlide } from "@/lib/api/admin/heroSlides";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default function EditHeroSlidePage() {
  const params = useParams<{ id: string }>();
  const { data: slide, error, loading } = useAsync(() => getHeroSlide(params.id), [params.id]);

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Homepage Hero", href: "/admin/hero-slides" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Hero Slide</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !slide) && (
        <div className="mt-6">
          <EmptyState
            icon={ImageOff}
            title="Hero slide not found"
            description={error ?? "This hero slide no longer exists."}
          />
        </div>
      )}

      {!loading && slide && (
        <div className="mt-6">
          <HeroSlideForm
            initialValues={slide}
            onSubmit={(data) => updateHeroSlide(slide.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
