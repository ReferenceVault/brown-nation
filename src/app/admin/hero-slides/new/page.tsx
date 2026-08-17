"use client";

import { createHeroSlide } from "@/lib/api/admin/heroSlides";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewHeroSlidePage() {
  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Homepage Hero", href: "/admin/hero-slides" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Hero Slide</h1>

      <div className="mt-6">
        <HeroSlideForm onSubmit={createHeroSlide} submitLabel="Create Slide" />
      </div>
    </div>
  );
}
